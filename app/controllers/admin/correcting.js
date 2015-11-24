import Ember from "ember";

export default Ember.Controller.extend({
	store: Ember.inject.service(),
	waves: Ember.computed("model", function() {
		var set = new Set();
		this.get("model").forEach(function(element) {
			set.add(element.get("wave"));
		}, this);
		return Array.from(set).sort(function(a, b) {
			return a.get("id") < b.get("id");
		});
	}),
	tasks: Ember.computed("wave", function() {
		var e = this.get("wave");
		if (!this.get("wave")) {
			this.set("task", "");
		}
		return this.get("model").filter(function(elem) {
			return elem.get("wave.id") === e;
		});
	}),
	participants: Ember.computed("task", "model", "wave", function() {
		var self = this;
		var set = new Set();
		this.get("model").forEach(function(element) {
			if (!self.get("task") || element.get("id") === self.get("task")) {
				element.get("solvers").forEach(function(e) {
					if (!e.get("organisator")) {
						set.add(e);
					}
				});
			}
		});
		return Array.from(set).sort(function(a, b) {
			return a.get("last_name") < b.get("last_name") ||
				(a.get("last_name") === b.get("last_name") && 
				 a.get("first_name") < b.get("first_name"));
		});
	}),
	actions: {
		task_select: function() {
			this.set("task", Ember.$("#task_sel").val());
		},
		participant_select: function() {
			this.set("participant", Ember.$("#par_sel").val());
		}
	}
});