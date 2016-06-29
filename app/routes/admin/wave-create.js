import Ember from "ember";
import ResetScroll from '../../mixins/reset-scroll';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(ResetScroll, AuthenticatedRouteMixin, {
    model: function() {
        return Ember.RSVP.hash({
            users: this.store.query("user", { filter: "organisators" } ),
            waves: this.store.findAll("wave"),
        });
    },
    title: "KSI: Nová vlna",
});
