import Ember from "ember";
import ResetScroll from '../../mixins/reset-scroll';

export default Ember.Route.extend(ResetScroll, {
	model: function() {
		return Ember.RSVP.hash({
			years: this.store.findAll("year"),
		});
	},
	title: "KSI: Správa ročníků"
});
