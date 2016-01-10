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
	}
});