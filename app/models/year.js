import DS from "ember-data";

export default DS.Model.extend( {
    index: DS.attr("number"),
    year: DS.attr("string")
});
