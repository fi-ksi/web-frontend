import DS from "ember-data";

export default DS.Model.extend( {
    reviewed_by: DS.belongsTo("user", {async: true, default: null}),
    score: DS.attr("number"),
    is_corrected: DS.attr("boolean")
});
