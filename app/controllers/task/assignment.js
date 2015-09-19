import Ember from "ember";

export default Ember.Controller.extend({
	module_service: Ember.inject.service('module-service'),
	resubmit: false,
	opened: Ember.computed("model.time_deadline", function() {
		if(!this.get("model.time_deadline")) {
			return true;
		}
		var currentdate = new Date();
		if (this.get("model.time_deadline") > currentdate) {
			return true;
		}
		return false;
	}),
	show_submission: Ember.computed("resubmit", "model.submissions", function() {
		if(this.get("resubmit")) {
			return true;
		}
		return Ember.isEmpty(this.get("model.submissions"));
	}),
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
		},
		new_submit: function() {
			this.set("resubmit", true);
		}
	}
});