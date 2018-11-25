import DS from "ember-data";

/**
 * Single post in discussion
 */
export default DS.Model.extend( {
    author: DS.belongsTo("user", {async: true}),
    thread: DS.belongsTo("thread", {async: true, inverse: null}),
    published_at: DS.attr("date"),
    body: DS.attr("string"),
    parent: DS.belongsTo("post", {async: true, inverse: "reaction"}),
    reaction: DS.hasMany("post", {async: true, inverse:"parent"}),
    is_new: DS.attr("boolean"),
    temporary: DS.attr("boolean") // temporary threads are invisible
                                  // this is used when creating threads
});
