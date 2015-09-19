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
	module_ids: Ember.computed("model", function() {
		return this.get("model.modules").map(function(module) { return "module_" + module.get("id"); });
	}),
	submit_all: function() {
		var self = this;
		if(this.get("module_ids").every(function(id) { return id in self.get("results"); } )) {
			// Check if all components have suceeed
			if(this.get("module_ids").every(function(id) {return self.get("results." + id + ".type") === "success"; })) {
				// ToDo: Collect data and send response - it depends on backend
			} else {
				// Scroll to highest error
				var elems = Ember.$(".alert-danger");
				var offset = Math.min.apply(null, Ember.$.map(elems, function(elem) { return Ember.$(elem).offset().top; }));
				Ember.$('html, body').animate({
			        scrollTop: offset - 150 //Magic constant
			    }, "slow");
			}
			console.log("All components have responded!");
		}
	},
	actions: {
		submit: function() {
			this.set("results", Ember.Object.create());
			this.get("module_service").emit_submit();
		},
		result: function(id, message) {
			this.get("results").set(id, { type: "success", data: message});
			console.log(id + " sent: ");
			console.log(message);
			this.submit_all();
		},
		error: function(id) {
			this.get("results").set(id, { type: "fail" });
			console.log(id + " reports error");
			this.submit_all();
		},
		new_submit: function() {
			this.set("resubmit", true);
		}
	}
});