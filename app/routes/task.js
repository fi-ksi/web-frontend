import Ember from "ember";
import ResetScroll from '../mixins/reset-scroll';

export default Ember.Route.extend(ResetScroll, {
	model: function(params) {
		return this.store.find("task", params["task_id"]);
	},
});