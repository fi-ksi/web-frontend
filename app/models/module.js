import DS from "ember-data";
import Ember from "ember";

export default DS.Model.extend( {
	type: DS.attr("string"),
	is_quiz: Ember.computed("type", function() {
		return this.get("type") === "quiz";
	}),
	is_programming: Ember.computed("type", function() {
		return this.get("type") === "programming";
	}),
	is_general: Ember.computed("type", function() {
		return this.get("type") === "general";
	}),

	// For quiz

	// For code
	code: DS.attr("string")
});
