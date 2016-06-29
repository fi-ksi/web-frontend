import Ember from "ember";
import ResetScroll from '../../mixins/reset-scroll';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(ResetScroll, AuthenticatedRouteMixin, {
    model: function() {
        return this.store.findAll("year");
    },
    title: "KSI: Nový ročník",
});
