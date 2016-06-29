import Ember from "ember";
import ResetScroll from '../../mixins/reset-scroll';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(ResetScroll, AuthenticatedRouteMixin, {
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
