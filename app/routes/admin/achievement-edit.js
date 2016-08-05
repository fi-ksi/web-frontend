import Ember from "ember";
import ResetScrollProtected from "../../mixins/reset-scroll-protected";

export default Ember.Route.extend(ResetScrollProtected, {
    model: function(params) {
        return Ember.RSVP.hash({
            achievement: this.store.find("achievement", params["ach_id"]),
            content: this.store.find("content", "achievements"),
        });
    },
    title: "KSI: Úprava trofeje",
    actions: {
      willTransition: function() {
        this.controller.set('save_status', "");
        this.controller.set('error_status', "");
      }
    }
});
