import DS from "ember-data";

export default DS.Model.extend( {
	user: DS.belongsTo("user", {async: true}),
	reviewed_by: DS.belongsTo("organisator", {async: true}),
	comment: DS.attr("string"),
	task: DS.belongsTo("task", {async: true}),
	score: DS.attr("number"),
	achievements: DS.hasMany("achievement", {async: true})
});
