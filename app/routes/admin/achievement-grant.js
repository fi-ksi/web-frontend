import Ember from "ember";
import ResetScrollProtected from "../../mixins/reset-scroll-protected";

export default Ember.Route.extend(ResetScrollProtected, {
    model: function() {
        return Ember.RSVP.hash({
            tasks: this.store.findAll("task"),
            users: this.store.findAll("user"),
            achievements: this.store.findAll("achievement"),
        });
    },
    title: "KSI: Udělit trofej",
    actions: {
        willTransition: function() {
            this.controller.set('sel_users', []);
            this.controller.set('achievement', undefined);
            this.controller.set('grant_status', "");
            this.controller.set('grant_error', "");
        }
    }
});
