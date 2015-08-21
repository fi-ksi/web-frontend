import DS from "ember-data";

export default DS.Model.extend( {
	node_parent: DS.hasMany("task", { async: true }),
	position: DS.attr("point"),
	category: DS.belongsTo("category", { async: true }),
	title: DS.attr("string"),
	body: DS.attr("string"),
	intro: DS.attr("string"),
	max_score: DS.attr("number"),
	picture: DS.attr("string"),
	author: DS.belongsTo("organisator", { async: true }),
	thread: DS.belongsTo("thread",  { async: true }),
	active: DS.attr("boolean"),
	modules: DS.hasMany("module",  { async: true }),
	time_deadline: DS.attr("date"),
	time_published: DS.attr("date"),
	best_scores: DS.hasMany("score", { async: true}),
	my_score: DS.belongsTo("score", {async: true}),
	solution: DS.attr("string")
});
