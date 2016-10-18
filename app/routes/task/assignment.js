import Ember from "ember";
import ResetScroll from '../../mixins/reset-scroll';

export default Ember.Route.extend(ResetScroll, {
    renderTemplate: function(controller, model) {
        this._super(controller, model);
        Ember.run.later(this, function() {
            console.log("here!");
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        }, 500);
    }
});
