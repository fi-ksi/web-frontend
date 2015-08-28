import DS from "ember-data";

export default DS.Model.extend( {
	// Relevant only if displaing user profile
	signed_in: DS.attr("boolean", {default: false}),

	name: DS.attr("string"),
	profile_pic: DS.attr("string"),
	short_info: DS.attr("string"),

	school_name: DS.attr("string"),
	country: DS.attr("string"),

	// Relevant only when not organisator
	achievements: DS.hasMany("achievement", {async: true, defaultValue: []}),
	score: DS.attr("number"),
	percentile: DS.attr("number"),
	seasons: DS.attr("number"),
	successful: DS.attr("number"),
	results: DS.hasMany("score", {async: true, defaultValue: []}),

	// Relevant only when organisator
	admin: DS.attr("boolean", {defaultValue: false}),
	organisator: DS.attr("boolean", {defaultValue: false}),
	tasks: DS.hasMany("task", {defaultValue: [], async: true})
});
