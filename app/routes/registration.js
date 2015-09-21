import Ember from "ember";
import ResetScroll from '../mixins/reset-scroll';

export default Ember.Route.extend(ResetScroll, {
	model: function() {
		var profile = this.store.createRecord('profile');
		return profile;
	},
	title: "KSI: Registrace"
});