import DS from "ember-data";
import Ember from "ember";

export default DS.Model.extend( {
	title: DS.attr("string"),
	picture_active: DS.attr("string"),
	picture_inactive: DS.attr("string"),
	active: DS.attr("boolean"),
	picture: Ember.computed("active", "picture_active", "picture_inactive", function() {
       if(this.get("active")) {
       		return this.get("picture_active");
       }
       if(this.get("picture_inactive")) {
       		return this.get("picture_inactive");
       }
    })
});
