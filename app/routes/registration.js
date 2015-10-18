import Ember from "ember";
import ResetScrollUnauthenticated from "../mixins/reset-scroll-unauthenticated";

export default Ember.Route.extend(ResetScrollUnauthenticated, {
	model: function() {
		/*var profile = this.store.createRecord('profile');
		return profile;*/
		return {};
	},
	title: "KSI: Registrace",
	setupController: function(controller, model) {
	    this._super(controller, model);
	    controller.set('model', model);
	    controller.set('registration_done', false);
	    controller.set('registration_in_progress', false);
	}
});