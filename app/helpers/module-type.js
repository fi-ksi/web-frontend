import Ember from "ember";

export default Ember.Helper.helper(function(module) {
	var ret = "blank";
  if (module.is_correct) {
    ret = "correct";
  } else if (module.is_incorrect) {
    ret = "incorrect";
  }
	return ret;
});
