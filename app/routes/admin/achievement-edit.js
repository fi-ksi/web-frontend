import Ember from "ember";
import ResetScroll from '../../mixins/reset-scroll';

export default Ember.Route.extend(ResetScroll, {
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
