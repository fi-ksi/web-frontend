import Ember from "ember";
import ResetScroll from '../../mixins/reset-scroll'; // ToDo: Protected route

export default Ember.Route.extend(ResetScroll, {
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
    }
});
