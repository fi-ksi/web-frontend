import DS from "ember-data";

export default DS.Model.extend( {
    index: DS.attr("number"),
    year: DS.attr("string"),
    sum_points: DS.attr("number"),
    tasks_cnt: DS.attr("number"),
    sealed: DS.attr("boolean"),
    point_pad: DS.attr("number"),
    active_orgs: DS.hasMany("user")
});
