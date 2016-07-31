import Ember from "ember";
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Mixin.create(AuthenticatedRouteMixin, {
    activate: function() {
        this._super();
        Ember.$("html, body").animate({ scrollTop: 0 }, "slow");
    }
});
