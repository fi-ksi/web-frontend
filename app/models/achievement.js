import DS from "ember-data";

export default DS.Model.extend( {
    active: DS.attr("boolean"),
    title: DS.attr("string"),
    picture: DS.attr("string"),
    description: DS.attr("string"),
    persistent: DS.attr("boolean"),
});
