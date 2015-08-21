import DS from "ember-data";
import Ember from "ember";

/**
 * User
 */
export default DS.Model.extend( {
	first_name: DS.attr("string"),
	last_name: DS.attr("string"),
	nick_name: DS.attr("string"),
	full_name: Ember.computed("first_name", "nick_name", "last_name", function() {
		//console.log(this.get("nick_name"));
    	if(this.get("nick_name") === undefined || this.get("nick_name").length === 0) {
    		return this.get("first_name") + ' ' + this.get("last_name");
    	}
    	return this.get("first_name") + ' "' + this.get("nick_name") + '" ' + this.get("last_name");
	}),
	profile_picture: DS.attr("string"),
	email: DS.attr("string"),
	phone: DS.attr("string")
});
