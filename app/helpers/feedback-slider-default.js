import Ember from "ember";

export default Ember.Helper.helper(function(val) {
    if (val === "" || val === undefined){
        return 3;
    }
    return val;
});
