import Ember from "ember";

export default Ember.Controller.extend({
	mathObserver: function() {
		alert("Here");
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }.observes("model.details.body")
});
