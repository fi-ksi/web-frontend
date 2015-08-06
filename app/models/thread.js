import DS from "ember-data";

/**
 * Thread in discussion
 */
export default DS.Model.extend( {
	title: DS.attr("string")
});
