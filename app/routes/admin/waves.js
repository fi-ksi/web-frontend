import Ember from "ember";
import ResetScrollProtected from "../../mixins/reset-scroll-protected";

export default Ember.Route.extend(ResetScrollProtected, {
    model: function() {
        return Ember.RSVP.hash({
            waves: this.store.findAll("wave"),
            users: this.store.query("user", { filter: "organisators" } )
        });
    },
    title: "KSI: Správa vln"
});
