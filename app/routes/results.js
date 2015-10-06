import Ember from "ember";
import ResetScroll from '../mixins/reset-scroll';

export default Ember.Route.extend(ResetScroll, {
	model: function() {
		this.store.unloadAll("user");
		return this.store.findQuery("user", { filter: "participants"} );
	},
	title: "KSI: Výsledky"
});