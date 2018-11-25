import Ember from "ember";
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Mixin.create(UnauthenticatedRouteMixin, {
    activate: function() {
        this._super();
        Ember.$("html, body").animate({ scrollTop: 0 }, "slow");
    }
});
