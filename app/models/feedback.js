import DS from "ember-data";

export default DS.Model.extend( {
    userId: DS.attr("number"),
    // id: DS.belongsTo("task"), // cannot be assigned
    filled: DS.attr("boolean"),
    categories: DS.attr(),
});
