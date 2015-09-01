import Ember from "ember";

export default Ember.Controller.extend( {
	actions: {
		sub: function(id) {
			console.log("Zachyceno!");
		}
	}
});