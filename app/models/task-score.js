import DS from "ember-data";

export default DS.Model.extend( {
	reviewed_by: DS.belongsTo("user", {async: true}),
	thread: DS.belongsTo("thread", {async: true}),
	score: DS.attr("number"),
	achievements: DS.hasMany("achievement", {async: true}),
	score_table: DS.attr("score-table")
});
