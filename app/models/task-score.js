import Ember from "ember";
import DS from "ember-data";

export default DS.Model.extend( {
	task: DS.belongsTo("task"),
	achievements: DS.hasMany("achievements", {async: true}),
	score: DS.attr("number"),

	percent: Ember.computed("score", function() {
		if (this.get("task").get("max_score") > 0) {
			return Math.floor((this.get("score") / this.get("task").get("max_score")) * 100);
		} else {
			return 100;
		}
	}),

	score_published: Ember.computed("score", function() {
		return (this.get("score") != null);
	})
});
