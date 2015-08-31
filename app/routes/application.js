import Ember from "ember";
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';


export default Ember.Route.extend(ApplicationRouteMixin, {
	model: function() {	
		/*return this.store.query("profile",  {
			info: "short"
		});*/ // After backend is working
		return this.store.find("profile", "");
	},
});