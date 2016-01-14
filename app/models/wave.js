import DS from "ember-data";
import Ember from "ember";

export default DS.Model.extend( {
	'caption': DS.attr("string"),
	'garant': DS.belongsTo("user", { async: true }),
	'public': DS.attr("boolean"),
	'time_published': DS.attr("date"),
	'year': DS.belongsTo("year", { async: true }),
	'index': DS.attr("number"),
});
