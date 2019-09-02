import Ember from "ember";

export default Ember.Helper.helper(function(val) {
    if (val === ""){
        return 3;
    }
    return val;
});
