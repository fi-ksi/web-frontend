import Ember from "ember";
import ResetScroll from '../mixins/reset-scroll';
import config from '../config/environment';

export default Ember.Route.extend(ResetScroll, {
	model: function(params) {
		this.set("thread_id", params["thread_id"]);
		return this.store.find("thread", params["thread_id"]);
	},
	afterModel: function() {
		// Non-system hack
		Ember.$.ajax({
            url: config.API_LOC + "/threads/" + this.get("thread_id"),
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
	},
	thread_id: undefined
});