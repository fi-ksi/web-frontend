import DS from "ember-data";

export default DS.Model.extend( {
    code: DS.attr("string"),
    merged: DS.attr("string"),
    stdout: DS.attr("string"),
    stderr: DS.attr("string"),
    merge_stdout: DS.attr("string"),
    check_stdout: DS.attr("string")
});
