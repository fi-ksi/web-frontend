import DS from "ember-data";

export default DS.Model.extend( {
    dirs: DS.attr("raw"),
    files: DS.attr("raw")
});
