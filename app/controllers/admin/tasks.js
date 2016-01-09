import Ember from "ember";
import config from '../../config/environment';

export default Ember.Controller.extend( {
	store: Ember.inject.service(),
	session: Ember.inject.service(),
	deploy_status: "",
	deploy_log: "",
	error_status: "",
	wave: null,
	actions: {
		'task-deploy': function(task) {
			var self = this;

			self.get('session').authorize('authorizer:oauth2', function(header, h) {
				
				Ember.$.ajax({
					url: config.API_LOC + "/admin/tasks/"+task.id+"/deploy",
					type: 'POST',
					beforeSend: function(xhr) {
						xhr.setRequestHeader(header, h);
						self.set("deploy_status", "Odesílám požiadavok");
					},
					success: function(data) {
						if("result" in data) {
							if(data.result === 'ok') {

								self.set("deploy_status", "Akce úspěšně provedena.");
								self.sendAction('task-deploy-log', task);

							} else if(data.result === 'error') {
								self.set("error_status", data.error);
								self.set("deploy_status", "");
							} else {
								self.set("error_status", "Špatná odpověď serveru!");
								self.set("deploy_status", "");
							}
						} else {
							self.set("error_status", "Špatná odpověď serveru!");
							self.set("deploy_status", "");
						}
					},
					error: function() {
						self.set("error_status", "Špatná odpověď ze serveru! Zkus to za chvíli znovu. Pokud problém přetrvává, kontaktuj organizátora.");
						self.set("deploy_status", "");
					}
				});
			});
		},
		'task-deploy-log': function(task) {
			var self = this;

			var watchingTask = setInterval(function() {
				self.get('session').authorize('authorizer:oauth2', function(header, h) {
					Ember.$.ajax({
						url: config.API_LOC + "/admin/tasks/"+task.id+"/deploy",
						type: 'GET',
						beforeSend: function(xhr) {
							xhr.setRequestHeader(header, h);
							self.set("deploy_status", "Odesílám požiadavok");
						},
						success: function(data) {
								if(data.id === task.id) {
									self.set("deploy_status", data.deploy_status);
									self.set("deploy_log", data.log);

									if(data.deploy_status === 'done') {
										
										clearInterval(watchingTask);

										self.get('model').reload();
									}
								}
						},
						error: function() {
							self.set("error_status", "Špatná odpověď ze serveru! Zkus to za chvíli znovu. Pokud problém přetrvává, kontaktuj organizátora.");
							self.set("deploy_status", "");
						}
					});
				});
			}, 1000);
		},
		'task-merge': function(task) {
			var self = this;

			self.get('session').authorize('authorizer:oauth2', function(header, h) {
				Ember.$.ajax({
					url: config.API_LOC + "/admin/tasks/"+task.id+"/merge",
					type: 'POST',
					beforeSend: function(xhr) {
						xhr.setRequestHeader(header, h);
						self.set("merge_status", "Odesílám pozadavek");
					},
					success: function(data) {
						if("result" in data) {
							if(data.result === 'ok') {
								self.set("deploy_status", "Akce úspěšně provedena.");
							} else if(data.result === 'error') {
								self.set("error_status", data.error);
								self.set("deploy_status", "");
							} else {
								self.set("error_status", "Špatná odpověď serveru!");
								self.set("deploy_status", "");
							}
						} else {
							self.set("error_status", "Špatná odpověď serveru!");
							self.set("deploy_status", "");
						}
					},
					error: function() {
						self.set("error_status", "Špatná odpověď ze serveru! Zkus to za chvíli znovu. Pokud problém přetrvává, kontaktuj organizátora.");
						self.set("deploy_status", "");
					}
				});
			});
		},
		'task-delete': function(task) {
			task.destroyRecord(); // DELETE to /admin/atask/1
		},
		'task-create': function() {
			var newTask = this.get("store").createRecord('atask');
			newTask.set("is_new", true);
			this.transitionTo('admin/task-edit', newTask);
		},
		wave_select: function() {
			this.set("wave", parseInt(Ember.$("#wave_sel").val()));
		},
	},
	tasks: Ember.computed("wave", "model", "session.current_user", function(){
		var user = this.get("session.current_user");
		if(user) {
			var selectedWave = this.get("wave");
			return this.get("model").map(function(task) {

				var is_admin = user.get("role") === "admin";
				var authorized = task.git_branch && task.git_path && (is_admin || 
					((new Date() < task.wave.time_published) && (user === task.author || user === task.wave.garant)));

				task.set("can_deploy", authorized);
				task.set("can_merge", authorized && task.git_branch !== 'master');
				task.set("can_delete", is_admin);

				return task;
			}).filter(function(elem) {
				return !selectedWave || parseInt(elem.get("wave.id")) === selectedWave;
			});
		} else {
			return undefined;
		}
	}),
	waves: Ember.computed("store", function() {
    	var set = new Set();
        this.get("store").findAll("wave").forEach(function(element) {
        	set.add(element);
		}, this);
		return set;
	})
});
