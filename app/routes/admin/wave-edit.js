import Ember from "ember";
import ResetScrollProtected from "../../mixins/reset-scroll-protected";

export default Ember.Route.extend(ResetScrollProtected, {
    model: function(params) {
        return Ember.RSVP.hash({
            wave: this.store.find("wave", params["wave_id"]),
            users: this.store.query("user", { filter: "organisators" } )
        });
    },
    title: "KSI: Úprava vlny",
    actions: {
      willTransition: function() {
        this.controller.set('save_status', "");
        this.controller.set('error_status', "");
      }
    }
});
