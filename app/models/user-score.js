import DS from "ember-data";

export default DS.Model.extend( {
    user: DS.belongsTo("user", {async: true}),
    score: DS.attr("number"),
    achievements: DS.hasMany("achievement", {async: true})
});
