import Ember from "ember";
import ResetScroll from '../mixins/reset-scroll';

export default Ember.Route.extend(ResetScroll, {
    model: function(params) {
        return this.store.find("thread", params["thread_id"]);
    },
    titleToken: function(model) {
        return model.get("title");
    },
    title: function(tokens) {
        return "KSI: " + tokens.pop();
    },
    actions: {
        willTransition: function() {
            this.controller.mark_thread_as_read();
        }
    },
    renderTemplate: function(controller, model) {
        this._super(controller, model);
        Ember.run.later(this, function() {
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        }, 500);
    }
});
