import Ember from "ember";
import ResetScroll from '../../mixins/reset-scroll';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(ResetScroll, AuthenticatedRouteMixin, {
    title: "KSI: Nový článek",
    actions: {
        willTransition: function() {
            this.controller.set('title', "");
            this.controller.set('body', "");
            this.controller.set('published', false);
            this.controller.set('picture', "");
        }
    }
});
