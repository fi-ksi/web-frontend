import Ember from "ember";
import ResetScroll from '../../mixins/reset-scroll';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(ResetScroll, AuthenticatedRouteMixin, {
    model: function() {
        return Ember.RSVP.hash({
            tasks: this.store.findAll("atask"),
            waves: this.store.findAll("wave"),
            users: this.store.query("user", { filter: "organisators" } )
        });
    },
    title: "KSI: Správa úloh"
});
