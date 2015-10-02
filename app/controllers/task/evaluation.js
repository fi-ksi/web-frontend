import Ember from "ember";

export default Ember.Controller.extend({
	submitted: Ember.computed('model.details.modules.[]', function() {
	    var res = false;
	    this.get('model.details.modules').mapBy('score.score').forEach(function(score) {
	    	console.log("Score: ", score);
	     	res |= typeof score != 'undefined';
	    });
	    return res;
    }),
	sum: Ember.computed('model.details.modules.[]', function() {
	    var sum = 0;
	    this.get('model.details.modules').mapBy('score.score').forEach(function(score) {
	      sum = sum + score;
	    });
	    return sum;
    }),
	progress_width: function() {
		var res = this.get("sum") / this.get("model.max_score") * 100;
		if (res > 100) {
			res = 100;
		}
		return Math.round(res);
	}.property("sum", "model.max_score")
});