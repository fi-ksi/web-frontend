import Ember from "ember";

export default Ember.Controller.extend({
	store: Ember.inject.service(),
	participant: "",
	task: "",
	queryParams: ["participant", "task"],
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
	corrections_filtered: Ember.computed("corrections", "state", function() {
		var val = this.get("state");
		if (val == "all") {
			return this.get("corrections");
		}
		return this.get("corrections").filter(function(p) {
			return p.get("state") === val;
		});
	}),
	is_fully_corrected: Ember.computed("corrections", function() {
		return 0 == this.get("corrections").filter(function(p) {
			return p.get("state") === "notcorrected";
		}).length;
	}),
	set_filter_warning: function() {
		if (this.get("participant") === "" && this.get("task") === "") {
			this.set("wrong-filter", true);
			return true;
		}
		this.set("wrong-filter", false);
		return false;
	},
	actions: {
		task_select: function() {
			var t = this.get("task");
			this.set("task", Ember.$("#task_sel").val());
			if(t !== this.get("task")) {
				this.set_filter_warning();
			}
		},
		participant_select: function() {
			var p = this.get("participant");
			this.set("participant", Ember.$("#par_sel").val());
			if (p !== this.get("participant")) {
				this.set_filter_warning();
			}
		},
		filter: function() {
			if (this.set_filter_warning()) {
				return;
			}
			var params = {};
			if (this.get("task") !== "") {
				params["task"] = this.get("task");
			}
			if(this.get("participant") !== "") {
				params["participant"] = this.get("participant");
			}
			this.set("corrections", this.get("store").find("correction", params));
		}
	}
});