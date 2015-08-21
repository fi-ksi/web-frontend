import DS from "ember-data";

/**
 * Thread in discussion
 */
export default DS.Model.extend( {
	title: DS.attr("string"),
	root_posts: DS.hasMany("post", {async: true})
});
