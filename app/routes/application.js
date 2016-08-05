import Ember from "ember";
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
    session: Ember.inject.service(),

    title: "KSI – Korespondenční seminář z informatiky",

    actions: {
        reload: function() {
            this.refresh();
        },
    },

});
