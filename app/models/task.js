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

	picture_base: DS.attr("string"),
	picture_suffix: DS.attr("string"),

	picture: Ember.computed("picture_base", "picture_suffix", "active",
	 "submissions", "my_score", function() {
	 	if(!this.get("active")) {
	 		return this.get("picture_base") + "locked" + this.get("picture_suffix");
	 	}
	 	if(Ember.isEmpty(this.get("submissions"))) {
	 		return this.get("picture_base") + "base" + this.get("picture_suffix");
	 	}
	 	if(!this.get("my_score")) {
	 		return this.get("picture_base") + "correcting" + this.get("picture_suffix");
	 	}
		return this.get("picture_base") + "done" + this.get("picture_suffix");
	}),

	best_scores: DS.hasMany("user-score", { async: true}), // Top 5
	my_score: DS.belongsTo("task-score", {async: true, inverse:null}) // Complete review
});
