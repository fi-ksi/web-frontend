import Ember from "ember";
import ResetScrollProtected from "../../mixins/reset-scroll-protected";

export default Ember.Route.extend(ResetScrollProtected, {
    titleToken: function() {
        return "Spuštění kódu";
    },
    title: function(tokens) {
        return "KSI: " + tokens.pop();
    },

    actions: {
        willTransition: function() {
            this.controller.set("execs", []);
        }
    }
});
