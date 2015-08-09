import DS from "ember-data";

/**
 * Simple article, news or whatever
 */
export default DS.Model.extend( {
	title: DS.attr("string"),
	published_at: DS.attr("date"),
	last_edited_by: DS.belongsTo('user', {async: true}),
	intro: DS.attr("string"),
	body: DS.attr("string")
});
