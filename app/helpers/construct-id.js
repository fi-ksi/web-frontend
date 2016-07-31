import Ember from "ember";

export default Ember.Helper.helper(function(values) {
    var tmp = [];
    values.forEach(function(a) {
        tmp.push(a.toString());
    });
    return tmp.join("_");
});
