import Ember from "ember";
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';
import Configuration from '../config/environment';

export default Ember.Route.extend(ApplicationRouteMixin, {
	actions: {
		sessionAuthenticationSucceeded: function() {
			var attemptedTransition = this.get('session.attemptedTransition');
		    if (attemptedTransition) {
		    	console.log("Vytaženo: " + attemptedTransition.targetName);
		    	attemptedTransition.retry(); // <== would you look at that!
		    	this.get('session').set('attemptedTransition', null);
			} else {
		    	this.transitionTo(Configuration.routeAfterAuthentication);
			}
		}
	},
	title: "KSI – Korespondenční seminář z informatiky"
});