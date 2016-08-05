import Ember from "ember";
import ResetScrollProtected from "../../mixins/reset-scroll-protected";

export default Ember.Route.extend(ResetScrollProtected, {
    model: function() {
        return Ember.RSVP.hash({
            users: this.store.query("user", { filter: "organisators" } ),
            waves: this.store.findAll("wave"),
        });
    },
    title: "KSI: Nová vlna",
});
