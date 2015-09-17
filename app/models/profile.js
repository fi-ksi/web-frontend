import DS from "ember-data";

export default DS.Model.extend( {
	// Relevant only if displaing user profile
	signed_in: DS.attr("boolean", {default: false}),

	first_name: DS.attr("string"),
	last_name: DS.attr("string"),
	name: Ember.computed("first_name", "last_name", function() {
        return this.get("first_name") + ' ' + this.get("last_name");
    }),

	profile_pic: DS.attr("string"),
	short_info: DS.attr("string"),
	email: DS.attr("string"),

	// Relevant only when not organisator
	achievements: DS.hasMany("achievement", {async: true, defaultValue: []}),
	score: DS.attr("number"),
	percentile: DS.attr("number"),
	seasons: DS.attr("number"),
	successful: DS.attr("number"),
	results: DS.hasMany("score", {async: true, defaultValue: []}),

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
