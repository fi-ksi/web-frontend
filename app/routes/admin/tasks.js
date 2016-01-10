import Ember from "ember";
import ResetScroll from '../../mixins/reset-scroll';

export default Ember.Route.extend(ResetScroll, {
	model: function() {
		console.log("In tasks");
		return Ember.RSVP.hash({
			tasks: this.store.findAll("atask"),
			waves: this.store.findAll("wave"),
		});
	},
	title: "KSI: Správa úloh"
});
