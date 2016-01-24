import Ember from "ember";
import ResetScroll from '../mixins/reset-scroll';

export default Ember.Route.extend(ResetScroll, {
	model: function() {
		this.store.unloadAll("user");
		return this.store.query("user", { filter: "participants" , sort: "score" } );
	},
	title: "KSI: Výsledky"
});
