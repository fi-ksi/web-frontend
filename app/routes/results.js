import Ember from "ember";
import ResetScroll from '../mixins/reset-scroll';

export default Ember.Route.extend(ResetScroll, {
	model: function() {
		return Ember.RSVP.hash( {
			results: this.store.query("result-score", {}),
			users: this.store.findQuery("user", { filter: "participants"} )
		});
	},
	title: "KSI: Výsledky"
});