import DS from "ember-data";

export default DS.Model.extend( {
    body: DS.attr("string"),
    solution: DS.attr("string"),
    thread: DS.belongsTo("thread"),
    modules: DS.hasMany("module"),

    best_scores: DS.hasMany("user-score"), // Top 5

    comment: DS.belongsTo("thread"),
    achievements: DS.hasMany("achievements", { async: true })
});
