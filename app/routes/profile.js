import Ember from "ember";
import ResetScrollProtected from '../mixins/reset-scroll-protected';

export default Ember.Route.extend(ResetScrollProtected, {
    model: function(params) {
    	if("profile_id" in params) {
    		return this.store.find("user", params["profile_id"]);
    	}
    	this.store.unloadAll("profile");
        //return this.get("session.current_user");
        return this.store.find("profile", "");
    },
    title: "KSI: Profil"
});
