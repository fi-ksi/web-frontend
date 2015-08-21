import DS from "ember-data";

export default DS.Model.extend( {
	type: DS.attr("string"),

	// For quiz

	// For code
	code: DS.attr("string")
});
