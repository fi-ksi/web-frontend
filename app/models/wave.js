import DS from "ember-data";

export default DS.Model.extend( {
    'caption': DS.attr("string"),
    'garant': DS.belongsTo("user", { async: true }),
    'public': DS.attr("boolean"),
    'time_published': DS.attr("date"),
    'year': DS.belongsTo("year", { async: true }),
    'index': DS.attr("number"),
    'sum_points': DS.attr("number"),
    'tasks_cnt': DS.attr("number"),
});
