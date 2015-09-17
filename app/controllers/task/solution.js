import Ember from "ember";

export default Ember.Controller.extend({
	progress_width: function() {
		var res = this.get("model.my_score.score") / this.get("model.max_score") * 100;
		if (res > 100) {
			res = 100;
		}
		return Math.round(res);
	}.property("model.my_score.score")
});