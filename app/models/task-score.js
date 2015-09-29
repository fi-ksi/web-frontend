import DS from "ember-data";

export default DS.Model.extend( {
	user: DS.belongsTo("user", {async: true}),
	reviewed_by: DS.belongsTo("organisator", {async: true}),
	thread: DS.belongsTo("thread", {async: true}),
	score: DS.attr("number"),
	achievements: DS.hasMany("achievement", {async: true})
});
