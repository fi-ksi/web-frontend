import DS from "ember-data";

export default DS.Model.extend( {
	title: DS.attr("string"),
	published_at: DS.attr("date"),
	// last_edited_by: DS.belongsTo('user'),
	intro: DS.attr("string"),
	body: DS.attr("string")
});
