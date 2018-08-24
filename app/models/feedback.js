import DS from "ember-data";

export default DS.Model.extend( {
    userId: DS.attr("number"),
    // id: DS.belongsTo("task"), // cannot be assigned
    filled: DS.attr("string"),
    categories: DS.hasMany("feedback-category"),
    //categories: DS.attr(),
});
