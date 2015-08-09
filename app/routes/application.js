import Ember from "ember";

export default Ember.Route.extend( {
	model: function() {	
		/*return this.store.query("profile",  {
			info: "short"
		});*/ // After backend is working
		return this.store.find("profile", "");
	},
});