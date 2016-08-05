import Ember from "ember";
import ResetScrollProtected from "../../mixins/reset-scroll-protected";

export default Ember.Route.extend(ResetScrollProtected, {
    model: function() {
        return Ember.RSVP.hash({
            'corr-info': this.get('store').findAll("corrections_info"),
            'orgs': this.store.query("user", { filter: "organisators", sort: "score" } ),
            'achievements': this.store.find("achievement"),
        });
    },
    titleToken: function() {
        return "Opravování";
    },
    title: function(tokens) {
        return "KSI: " + tokens.pop();
    },

    actions: {
        willTransition: function() {
            this.controller.set("corrections", []);
        }
    }
});
