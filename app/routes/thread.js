import Ember from "ember";
import ResetScroll from '../mixins/reset-scroll';
import config from '../config/environment';

export default Ember.Route.extend(ResetScroll, {
	model: function(params) {
		return this.store.find("thread", params["thread_id"]);
	},
	afterModel: function() {
		var model = this.modelFor(this.routeName); 
		// Non-system hack
		Ember.$.ajax({
            url: config.API_LOC + "/threads/" + model.get("id"),
            data: {},
            contentType: "application/json",
            type: 'PUT',
        });
	},
	titleToken: function(model) {
		return model.get("title");
	},
	title: function(tokens) {
		return "KSI: " + tokens.pop();
	}
});