import Ember from "ember";
import ResetScrollProtected from "../../mixins/reset-scroll-protected";

export default Ember.Route.extend(ResetScrollProtected, {
    model: function() {
        return Ember.RSVP.hash({
            years: this.store.findAll("year"),
        });
    },
    title: "KSI: Správa ročníků"
});
