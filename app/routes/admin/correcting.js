import Ember from "ember";
import ResetScroll from '../../mixins/reset-scroll'; // ToDo: Protected route

export default Ember.Route.extend(ResetScroll, {
	model: function(params) {
		return this.get('store').findAll("corrections_info");
	},
	titleToken: function() {
		return "Opravování";
	},
	title: function(tokens) {
		return "KSI: " + tokens.pop();
	}
});