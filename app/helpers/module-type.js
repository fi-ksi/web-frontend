import Ember from "ember";

export default Ember.Helper.helper(function(type) {
	type = type[0];
	var ret = "blank";
	if (type === "correct") {
		ret = "correct";
	} else if (type === "incorrect") {
		ret = "incorrect";
	}
	return ret;
});
