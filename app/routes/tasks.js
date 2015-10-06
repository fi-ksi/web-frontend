import Ember from "ember";
import ResetScroll from '../mixins/reset-scroll';

export default Ember.Route.extend(ResetScroll, {
	model: function() {
		this.store.unloadAll("task");
		this.store.unloadAll("task-detail");
		this.store.unloadAll("module");
		return Ember.RSVP.hash({
			tasks: this.store.findAll("task", ""),
			categories: this.store.findAll("category", "") // Small hack - make sure all categories are loaded
		});
	},
	title: "KSI: Úlohy"
});