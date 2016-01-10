import Ember from "ember";
import config from '../../config/environment';

export default Ember.Controller.extend( {
	store: Ember.inject.service(),
	session: Ember.inject.service(),
	deploy_status: "",
	deploy_log: "",
	error_status: "",
	actions: {
		'task-deploy': function(task) {
			var self = this;

			self.set("deploy_log", "");
			Ember.$("#myModal").modal();

			self.get('session').authorize('authorizer:oauth2', function(header, h) {
				
				Ember.$.ajax({
					url: config.API_LOC + "/admin/atasks/"+task.id+"/deploy",
					type: 'POST',
					beforeSend: function(xhr) {
						xhr.setRequestHeader(header, h);
						self.set("deploy_status", "Odesílám požiadavok");
					},
					success: function(data) {
						task.reload();

						if("result" in data) {
							if(data.result === 'ok') {

								self.set("deploy_status", "Požadavek úspěšně odeslán, načítám log...");
								self.send('task-deploy-log', task);

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
						task.reload();
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
						url: config.API_LOC + "/admin/atasks/"+task.id+"/deploy",
						type: 'GET',
						beforeSend: function(xhr) {
							xhr.setRequestHeader(header, h);
							self.set("deploy_status", "Odesílám požiadavok");
						},
						success: function(data) {
								if (data.id === Number(task.id)) {
									self.set("deploy_status", data.deploy_status);
									self.set("deploy_log", data.log);

									if(data.deploy_status === 'done') {
										clearInterval(watchingTask);
										self.set("deploy_status", "Server úspěšně dokončil deploy");
										task.reload();
									}
									else if(data.deploy_status === 'error') {
										clearInterval(watchingTask);
										self.set("deploy_status", "Deploy skončil s chybou!");
										self.set("error_status", "Chyba pravděpodobně nastala kvůli špatné syntaxi úlohy v repozitáři. Pokus se prosím opravit syntaxi na základě chybové hlášky níže, případně kontaktuj administátora.");
										task.reload();
									}
								} else {
									clearInterval(watchingTask);
									self.set("error_status", "Špatná odpověď ze serveru - server posílá nekorektní ID v deployStatus! Zkus to za chvíli znovu. Pokud problém přetrvává, kontaktuj administrátora.");
									task.reload();
								}
						},
						error: function() {
							task.reload();
							clearInterval(watchingTask);
							self.set("error_status", "Chybová odpověď serveru na GET deployStatus! Zkus to za chvíli znovu. Pokud problém přetrvává, kontaktuj administrátora.");
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
	},
	tasks: Ember.computed("wave", "model", "session.current_user", function(){
		var user = this.get("session.current_user");
		if(user) {
			var selectedWave = this.get("wave");
			if (selectedWave === undefined) {
				selectedWave = this.get('model.waves.lastObject.id');
				this.set("wave", selectedWave);
			}
			var currentWave;
			return this.get("model.tasks").map(function(task) {

				var is_admin = user.get("role") === "admin";
				var authorized = task.get("git_branch") && task.get("git_path") && (is_admin ||
					((new Date() < task.get("wave").get("time_published")) && (user.id === task.get("author").get("id") || user.id === task.get("wave").get("garant").get("id"))));

				task.set("can_deploy", authorized);
				task.set("can_merge", authorized && task.get("git_branch") !== 'master');
				task.set("can_delete", is_admin && (new Date() < task.get("wave").get("time_published")));
				task.set("can_create", is_admin || (user.id === task.get("wave.garant.id")));

				task.set("first_in_wave", currentWave !== task.get("wave.index"));
				if (currentWave !== task.get("wave.id")) {
					currentWave = task.get("wave.index");
				}

				return task;
			}).filter(function(elem) {
				return !selectedWave || elem.get("wave.id") === selectedWave;
			});
		} else {
			return undefined;
		}
	}),

	waves: Ember.computed.sort("model.waves", function(a, b) {
		if (a.get("index") < b.get("index")) { return 1; }
		if (a.get("index") > b.get("index")) { return -1; }
		return 0;
	})
});
