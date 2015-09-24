import DS from "ember-data";

/**
 * Single post in discussion
 */
export default DS.Model.extend( {
	author: DS.belongsTo("user", {async: true}),
	parent_thread: DS.belongsTo("thread", {async: true, inverse: "root_posts"}),
	published_at: DS.attr("date"),
	body: DS.attr("string"),
	reaction: DS.hasMany("post", {async: true, inverse:null}),
	is_new: DS.attr("boolean")
});
