import Ember from "ember";

export default Ember.Route.extend( {
	offset: 0,
	limit: 3,
	queryParams: {
		page: {
			refreshModel: true
		}
	},

	model: function(params) {
		var page;
		if (params.page) {
			page = params.page;
			page = isNaN(page) ? 1 : Math.floor(Math.abs(page));
			this.set('offset', (page - 1) * this.get('limit'));
		}

		return this.store.findAll("article", {
			_start: this.get("offset"),
			_limit: this.get("limit")
		});
	},

	setupController: function(controller, model) {
		controller.set('model', model); 
		controller.setProperties( {
			offset: this.get("offset"),
			limit: this.get("limit")
		});
	}
});