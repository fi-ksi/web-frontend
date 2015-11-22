import Ember from "ember";

export default Ember.Controller.extend({
	mathObserver: function() {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }.observes("model.details.body")
});
