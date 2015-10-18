import Ember from "ember";
import ResetScrollProtected from '../mixins/reset-scroll-protected';

export default Ember.Route.extend(ResetScrollProtected, {
    model: function() {
        //return this.get("session.current_user");
        this.store.unloadAll("profile");
        return this.store.find("profile", "");
    },
    afterModel: function(model) {
    	this.set("session.current", model);
    },
    title: "KSI: Nastavení",
    setupController: function(controller, model) {
	    this._super(controller, model);
	    controller.set('global_error', null);
	    controller.set('global_info', null);
	}
});
