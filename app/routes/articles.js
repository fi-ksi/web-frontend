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
		// Only for fixture
		this.store.findAll("article").then(function(that) {
			alert("Done");
			return function(completeList) {
				alert(JSON.stringyfy(completeList));
				that.store.metaForType("article", { total: completeList.get("length")});
			};
		} (this));
		/*this.store.find("articles").then(function(that){
	      return function(completeList) {
	        that.store.metaForType("articles", { total: completeList.get('length')});
	      };
	    }(this));*/

		return this.store.findAll("article", {
			offset: this.get("offset"),
			limit: this.get("limit")
		});
	},

	setupController: function(controller) {
		controller.setProperties( {
			offset: this.get("offset"),
			limit: this.get("limit")
		});
	}
});