import DS from "ember-data";
import Ember from "ember";

export default DS.Model.extend( {
	prerequisities: DS.attr("prerequisite"),
	category: DS.belongsTo("category", { async: true }),

	state: DS.attr("string"),
	active: Ember.computed("state", function() {
		return ["base", "correcting", "done"].indexOf(this.get("state")) > -1;
	}),

	title: DS.attr("string"),
	author: DS.belongsTo("user", { async: true }),
	intro: DS.attr("string"),
	max_score: DS.attr("number"),

	time_deadline: DS.attr("date"),
	time_published: DS.attr("date"),

	picture_base: DS.attr("string"),
	picture_suffix: DS.attr("string"),

	picture: Ember.computed("picture_base", "picture_suffix", "active",
	 "state", function() {
	 	if(!this.get("active")) {
	 		return this.get("picture_base") + "locked" + this.get("picture_suffix");
	 	}
	 	return this.get("picture_base") + this.get("state") + this.get("picture_suffix");
	}),
	details: DS.belongsTo("task-detail", {async: true})
});
