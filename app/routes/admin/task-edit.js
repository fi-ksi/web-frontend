import Ember from "ember";
import ResetScroll from '../../mixins/reset-scroll';

export default Ember.Route.extend(ResetScroll, {
	model: function(params) {
		return this.store.find("atask", params["task_id"]);
	},
	titleToken: function(model) {
		return model.get("title");
	},
	title: function(tokens) {
		return "KSI: " + tokens.pop();
	}
});
