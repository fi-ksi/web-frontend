import DS from "ember-data";
import Ember from "ember";

export default DS.Model.extend( {
	node_parent: DS.hasMany("task", { async: true, inverse:null}),

	prerequisities: DS.attr("prerequisite"),
	category: DS.belongsTo("category", { async: true }),

	active: DS.attr("boolean"),

	title: DS.attr("string"),
	body: DS.attr("string"),
	intro: DS.attr("string"),
	max_score: DS.attr("number"),
	solution: DS.attr("string"),
	author: DS.belongsTo("organisator", { async: true }),
	thread: DS.belongsTo("thread",  { async: true }),
	modules: DS.hasMany("module",  { async: true }),
	time_deadline: DS.attr("date"),
	time_published: DS.attr("date"),

	picture_locked: DS.attr("string"),
	picture_active: DS.attr("string"),
	picture_submitted: DS.attr("string"),
	picture_finished: DS.attr("string"),

	picture: Ember.computed("picture_locked", "picture_active", "picture_submitted",
	 "picture_finished", "active", "submissions", "my_score", function() {
	 	if(!this.get("active")) {
	 		return this.get("picture_locked");
	 	}
	 	if(Ember.isEmpty(this.get("submissions"))) {
	 		return this.get("picture_active");
	 	}
	 	if(!this.get("my_score")) {
	 		return this.get("picture_submitted");
	 	}
		return this.get("picture_finished");
	}),

	best_scores: DS.hasMany("score", { async: true}),
	my_score: DS.belongsTo("score", {async: true, inverse:null}),
	submissions: DS.hasMany("submission", { async: true, inverse:null})
});
