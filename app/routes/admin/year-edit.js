import Ember from "ember";
import ResetScrollProtected from "../../mixins/reset-scroll-protected";

export default Ember.Route.extend(ResetScrollProtected, {
    model: function(params) {
        return Ember.RSVP.hash({
            year: this.store.find("year", params["year_id"]),
            orgs: this.store.query("user", { filter: "orgs-all" })
        });
    },
    title: "KSI: Úprava ročníku",
    actions: {
      willTransition: function() {
        this.controller.set('save_status', "");
        this.controller.set('error_status', "");
        this.conroller.set('orgs', undefined);
      }
    }
});
