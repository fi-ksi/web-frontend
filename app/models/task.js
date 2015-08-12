import DS from "ember-data";

/**
 * Assigment
 */
export default DS.Model.extend( {
	title: DS.attr("string"),
	pic: DS.attr("string"),
	author: DS.belongsTo("organisator", { async: true })
});