import Ember from "ember";

export default Ember.Controller.extend( {
	is_quiz: function() {
		return this.get("model").get("assignment").get("type") == "quiz";
	}.property("model"),
	is_programming: function() {
		return this.get("model").get("assignment").get("type") == "programming";
	}.property("model"),
	is_general: function() {
		return this.get("model").get("assignment").get("type") == "general";
	}
});