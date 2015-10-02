import DS from "ember-data";
import Ember from "ember";

export default DS.Model.extend( {
	// Relevant only if displaing user profile
	signed_in: DS.attr("boolean", {default: false}),

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
	short_info: DS.attr("string"),
	email: DS.attr("string"),
	gender: DS.attr("string"),

	// Relevant only when not organisator or admin
	achievements: DS.hasMany("achievement", {async: true, defaultValue: []}),
	score: DS.attr("number"),
	percentile: DS.attr("number"),
	seasons: DS.attr("number"),
	successful: DS.attr("number"),
	results: DS.hasMany("task-score", {defaultValue: []}),

	addr_street: DS.attr("string"),
    addr_city: DS.attr("string"),
    addr_zip: DS.attr("string"),
    addr_country: DS.attr("string"),

    school_name: DS.attr("string"),
    school_street: DS.attr("string"),
    school_city: DS.attr("string"),
    school_zip: DS.attr("string"),
    school_country: DS.attr("string"),
    school_finish: DS.attr("number"),

    tshirt_size: DS.attr("string"),

	// Relevant only when organisator
	admin: DS.attr("boolean", {defaultValue: false}),
	organisator: DS.attr("boolean", {defaultValue: false}),
	tasks: DS.hasMany("task", {defaultValue: [], async: true})
});
