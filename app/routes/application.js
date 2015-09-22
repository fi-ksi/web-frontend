import Ember from "ember";
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
	beforeModel: function(transition) {
		console.log("Before model!");
		this._super();
		console.log("Transition: " + transition.targetName);
		if (!this.get('session.isAuthenticated') && transition.targetName !== "login") {
			console.log("Loguji");
			console.log(transition);
			this.set('session.attemptedTransition', transition);
		}
	},
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
		},
		/*sessionRequiresAuthentication: function(params) {
			console.log("Cesta");
			console.log(this.controllerFor('application'));
			console.log("hotova");
			/*console.log("Auth required");
			//this.transitionTo(Configuration.authenticationRoute); --default behavior
			//Ember.$("#login-modal").toggleClass("modal");
			console.log("Auth required");
			Ember.$("#login_button").click();
		}*/
	},
	title: "KSI – Korespondenční seminář z informatiky"
});