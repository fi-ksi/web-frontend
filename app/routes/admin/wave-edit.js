import Ember from "ember";
import ResetScroll from '../../mixins/reset-scroll';

export default Ember.Route.extend(ResetScroll, {
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
