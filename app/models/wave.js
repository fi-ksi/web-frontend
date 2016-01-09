import DS from "ember-data";

export default DS.Model.extend( {
	'caption': DS.attr("string"),
	'garant': DS.belongsTo("user", { async: true }),
	'public': DS.attr("boolean"),
	'time_published': DS.attr("date"),
	'year': DS.attr("number"),
	'index': DS.attr("number")
});
