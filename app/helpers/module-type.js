import Ember from "ember";

export default Ember.Helper.helper(function(values) {
	var ret = "blank";
  if (values[0].is_correct) {
    ret = "correct";
  } else if (values[0].is_incorrect) {
    ret = "incorrect";
  }
	return ret;
});
