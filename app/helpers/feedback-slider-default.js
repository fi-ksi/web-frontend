import Ember from "ember";

export default Ember.Helper.helper(function(val) {
    // debugger;
    if (val === "" || val === undefined || val[0] === undefined){
        return 3;
    }
    return val;
});
