import DS from "ember-data";

export default DS.Model.extend( {
	task: DS.belongsTo("task"),
	achievements: DS.hasMany("achievements", {async: true}),
	score: DS.attr("number")
});
