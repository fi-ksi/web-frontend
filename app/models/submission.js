import DS from "ember-data";

export default DS.Model.extend( {
	datetime: DS.attr("date"),
	files: DS.attr("string"),
	achievements: DS.hasMany("achievement", {async: true, inverse:null}),
	score: DS.belongsTo("score", {async: true})
});
