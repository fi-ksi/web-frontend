import Ember from "ember";
import ResetScroll from '../../mixins/reset-scroll';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(ResetScroll, AuthenticatedRouteMixin, {
    model: function() {
        return this.store.find("content", "achievements");
    },
    title: "KSI: Nová trofej",
    actions: {
      willTransition: function() {
        this.controller.set('save_status', "");
        this.controller.set('error_status', "");
      }
    }
});
