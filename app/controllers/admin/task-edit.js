import Ember from "ember";

export default Ember.Controller.extend( {
	session: Ember.inject.service(),
	save_status: "",
	error_status: "",
	actions: {
		'task-save': function() {
			var self = this;
			this.get("model").save().then(function(){
				//self.transitionToRoute('admin/tasks');
				self.set("save_status", "Úloha uložená");
			}, function(){
				self.set("error_status", "Špatná odpověď ze serveru! Zkus to za chvíli znovu. Pokud problém přetrvává, kontaktuj organizátora.");
			});
		}
	},

	 canSave: Ember.computed("model", "model.wave", "session.current_user", "model.wave.garant", "model.author", function(){
		var user = this.get("session.current_user");
		if (user) {
			return (user.get("admin")) || (((user.get("id") === this.get("model.author.id")) || (user.get("id") === this.get("model.wave.garant.id"))) && (new Date() < this.get("model.wave.time_published")));
		} else {
			return undefined;
		}
	})

});
