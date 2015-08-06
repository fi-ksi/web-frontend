import Ember from "ember";
import ResetScroll from '../mixins/reset-scroll';

export default Ember.Route.extend(ResetScroll, {
	model: function(params) {
		console.log(params);
		return this.store.find("article", params["article_id"]);
	},
});