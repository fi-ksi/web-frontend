import DS from "ember-data";

/**
 * Thread in discussion
 */
export default DS.Model.extend( {
	root_posts: DS.hasMany("post"),
});
