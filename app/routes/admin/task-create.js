import Ember from "ember";
import ResetScroll from '../../mixins/reset-scroll';

export default Ember.Route.extend(ResetScroll, {
	model: function(params) {
		return Ember.RSVP.hash({
			users: this.store.findAll("user", { filter: "organisators" } ),
			wave: this.store.find("wave", params["wave_id"])
		});
	},
	title: "KSI: Nová úloha"
});
