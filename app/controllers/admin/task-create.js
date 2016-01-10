import Ember from "ember";
import config from '../../config/environment';

export default Ember.Controller.extend( {
	store: Ember.inject.service(),
	session: Ember.inject.service(),
	git_create: true,
	organisators: Ember.computed("model", function() {
		return this.get("model").users.filter(function(user){
			return user.get("organisator");
		});
	}),
	new_task: Ember.computed("model", function() {
		var task = this.get("store").createRecord('atask', {
			wave: this.get("model").wave,
		});
		task.set("generate_git", true);
		return task;
	}),
	actions: {
		'task-save': function() {
			var self = this;
			var task = this.get("new_task");

			self.get('session').authorize('authorizer:oauth2', function(header, h) {

				Ember.$.ajax({
					url: config.API_LOC + "/admin/atasks/"+task.id+"?git_create="+self.get("git_create"),
					data: JSON.stringify({
						"task": {
							"wave": task.wave,
							"title": task.title,
							"author": task.author,
							"git_path": task.git_path,
							"git_branch": task.git_branch,
							"git_commit": task.git_commit
						}
					}),
					contentType: "application/json",
					type: 'POST',
					beforeSend: function(xhr) {
						xhr.setRequestHeader(header, h);
						self.set("send_status", "Odesílám zprávu");
					},
					success: function() {
						self.transitionToRoute('admin/tasks');
					},
					error: function() {
						self.set("error_status", "Špatná odpověď ze serveru! Zkus to za chvíli znovu. Pokud problém přetrvává, kontaktuj organizátora.");
					}
				});
			});
		}
	},
	title_changed: function(){
		var task = this.get("new_task");
		if(task && task.get("generate_git")) {

			var newTaskId = this.get("store").all('atask').filter(function(element){
				return element.wave === task.wave;
			}).length;
			newTaskId = ("00" + newTaskId).substr(-2,2);

			var accentedCharacters = "úuůuýyáačcďdéeěeíiňnóořršsťtľlšs";
			var slug = task.get("title").toLowerCase()
				.replace(/[^A-Za-z0-9 ]/g, function(a){
					var i = accentedCharacters.indexOf(a);
					if(i >= 0) {
						return accentedCharacters.charAt(i + 1);
					}
					return '';
				})
				.replace(/ +/g,'-');

			var year = task.get("wave.year.year").match(/[0-9]+/g)[0];
			var wave = task.get("wave.index");
			var waveZeros = ("00" + wave).substr(-2,2);

			task.set("git_path", year+"/vlna"+wave+"/"+newTaskId+"_"+slug);
			task.set("git_branch", year+"_"+waveZeros+"_"+newTaskId+"_"+slug);
			task.set("generate_git", true);
		}
	}.observes('new_task.title')
});