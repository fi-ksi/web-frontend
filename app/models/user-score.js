import DS from "ember-data";

export default DS.Model.extend( {
	user: DS.belongsTo("user", {async: true}),
	task_name: DS.attr("string"),
	task_id: DS.attr("number"),
	score: DS.attr("number"),
	achievements: DS.hasMany("achievement", {async: true})
});
