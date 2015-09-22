import Ember from "ember";
import ResetScrollProtected from '../mixins/reset-scroll-protected';

export default Ember.Route.extend(ResetScrollProtected, {
    model: function(params) {
    	if("profile_id" in params) {
    		return this.store.find("user", params["profile_id"]);
    	}
    	console.log("Returning data from authentication");
        return this.get("session.current_user");
    },
    title: "KSI: Profil"
});
