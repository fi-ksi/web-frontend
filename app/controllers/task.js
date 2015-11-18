import Ember from "ember";

export default Ember.Controller.extend({
	mathObserver: Ember.computed("model", "model.details", function() {
        MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    })
});
