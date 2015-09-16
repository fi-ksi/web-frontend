import Ember from "ember";

export default Ember.Route.extend({
	beforeModel: function(param) {
		this._super();
		if("queryParams" in param && "view" in param.queryParams && param.queryParams.view === "faq") {
			console.log("Here!");
			Ember.$("#faq").livequery(function() {
				console.log("Done!");
				Ember.$('html, body').animate({
			        scrollTop: Ember.$("#faq").offset().top
			    }, "slow");
			});
		}
		else {
			Ember.$("html, body").animate({ scrollTop: 0 }, "slow");
		}
	},
	queryParams: {
		view: {
			refreshModel: true,
			replace: true,
			as: "view"
		}
	},
	view: null
});