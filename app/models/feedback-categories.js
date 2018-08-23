import DS from "ember-data";

export default DS.Model.extend( {
    // id: DS.attr("string"), // cant use ID as name because ember
    text: DS.attr("string"),
    type: DS.attr("string")

});
