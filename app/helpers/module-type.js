import Ember from "ember";

export default Ember.Helper.helper(function(module) {
	console.log(module.length);
	module = module[0];
	var ret = "blank";
	console.log("-----------------------");
	console.log(module);
  	console.log(module.get("state"));
	console.log(module.get("is_correct"));
	if (module.get("is_correct")) {
		ret = "correct";
	} else if (module.get("is_incorrect")) {
		ret = "incorrect";
	}
	return ret;
});
