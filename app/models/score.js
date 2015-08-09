import DS from "ember-data";

/**
 * Single post in discussion
 */
export default DS.Model.extend( {
	user: DS.belongsTo("user", {async: true}),
	reviewed_by: DS.belongsTo("organisator", {async: true}),
	task: DS.belongsTo("task", {async: true}),
	score: DS.attr("number"),
	achievements: DS.hasMany("achievement", {async: true})
});
