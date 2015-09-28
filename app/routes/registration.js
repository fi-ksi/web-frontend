import Ember from "ember";
import ResetScrollUnauthenticated from "../mixins/reset-scroll-unauthenticated";

export default Ember.Route.extend(ResetScrollUnauthenticated, {
	model: function() {
		/*var profile = this.store.createRecord('profile');
		return profile;*/
		return {};
	},
	title: "KSI: Registrace"
});