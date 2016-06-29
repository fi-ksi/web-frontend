import Ember from "ember";
import ResetScroll from '../../mixins/reset-scroll';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(ResetScroll, AuthenticatedRouteMixin, {
    model: function() {
        return Ember.RSVP.hash({
            years: this.store.findAll("year"),
        });
    },
    title: "KSI: Správa ročníků"
});
