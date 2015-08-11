import DS from "ember-data";
import Ember from "ember";

export default DS.Model.extend( {
	first_name: DS.attr("string"),
	last_name: DS.attr("string"),
	full_name: Ember.computed("first_name", "last_name", function() {
    	return this.get("first_name") + ' ' + this.get("last_name");
	}),
	score: DS.attr("number"),
	tasks_num: DS.attr("number"),
	achievements: DS.hasMany("achievement", {async: true})
});
