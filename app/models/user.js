import DS from "ember-data";
import Ember from "ember";

/**
 * User
 */
export default DS.Model.extend( {
	first_name: DS.attr("string"),
	last_name: DS.attr("string"),
	full_name: Ember.computed("first_name", "last_name", function() {
    	return this.get("first_name") + ' ' + this.get("last_name");
	}),
	birth: DS.attr("date"),
	school: DS.belongsTo("school"),
	address: DS.attr("string")
});
