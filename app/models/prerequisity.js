import DS from "ember-data";

export default DS.Model.extend( {
    parents: DS.hasMany("task", { async: true }),
});
