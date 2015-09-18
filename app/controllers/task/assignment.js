import Ember from "ember";

export default Ember.Controller.extend({
	module_service: Ember.inject.service('module-service'),
	actions: {
		submit: function() {
			this.get("module_service").emit_submit();
		},
		result: function(id, message) {
			console.log(id + " sent: ");
			console.log(message);
		},
		error: function(id) {
			console.log(id + " reports error");
		}
	}
});