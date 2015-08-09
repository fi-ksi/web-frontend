import DS from "ember-data";

export default DS.Model.extend( {
	title: DS.attr("string"),
	pic: DS.attr("string"),
	achieved_on: DS.attr("date")
});
