import Ember from "ember";
import config from '../../config/environment';

export default Ember.Controller.extend({
	init: function () {
	    this._super();
	    Ember.run.schedule("afterRender",this,function() {
	    	Ember.run.later(this, function() {
	    		MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
	    	}, 500);
	    });
	},
	mathObserver: function() {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }.observes("model", "model.details", "model.details.body")
});
