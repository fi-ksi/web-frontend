import Ember from "ember";

export default Ember.Route.extend({
	articles_limit: 4,
	model: function() {	
		return Ember.RSVP.hash( {
			articles: this.store.query("article", {
				_start: 0,
				_limit: this.get("articles_limit")
			})
		});		
	},
});