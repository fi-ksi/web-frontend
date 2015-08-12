import DS from "ember-data";

export default DS.Model.extend( {
	body: DS.attr("string"),
	type: DS.attr("string"), // quiz, coding, general

	// For coding
	code: DS.attr("string"),
	
});
