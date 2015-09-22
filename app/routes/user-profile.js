import Ember from "ember";
import ResetScrollProtected from '../mixins/reset-scroll-protected';

export default Ember.Route.extend(ResetScrollProtected, {
    model: function(params) {
    	return this.store.find("user", params["profile_id"]);
    },
    titleToken: function(model) {
    	return model.get("full_name");
    },
    renderTemplate: function() {
    	this.render("profile");
    },
    title: function(tokens) {
    	return "KSI: profil - " + tokens.pop();
    }
});
