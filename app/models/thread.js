import DS from "ember-data";

/**
 * Thread in discussion
 */
export default DS.Model.extend( {
	title: DS.attr("string"),
	details: DS.belongsTo("thread-detail", {async: true}),
	unread: DS.attr("number"),
	posts_count: DS.attr("number"),
	public: DS.attr("boolean", { default: "true" })
});
