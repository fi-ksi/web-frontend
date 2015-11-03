import Ember from "ember";
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
	session: Ember.inject.service(),
	/*actions: {
		sessionAuthenticationSucceeded: function() {
			var attemptedTransition = this.get('session.attemptedTransition');
		    if (attemptedTransition) {
		    	attemptedTransition.retry(); // <== would you look at that!
		    	this.get('session').set('attemptedTransition', null);
			} else {
		    	this.transitionTo(Configuration.routeAfterAuthentication);
			}
		}
	},*/
	title: "KSI – Korespondenční seminář z informatiky"
});
