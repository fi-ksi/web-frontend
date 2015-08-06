import DS from "ember-data";

/**
 * Single post in discussion
 */
export default DS.Model.extend( {
	author: DS.belongsTo("user"),
	published_at: DS.attr("date"),
	body: DS.attr("string"),
	reaction: DS.hasMany("post")
});
