import Ember from "ember";
import ResetScroll from '../mixins/reset-scroll';

export default Ember.Route.extend(ResetScroll, {
    model: function(params) {
    	return this.store.find("user", params["profile_id"]);
    },
    titleToken: function(model) {
    	return model.get("full_name");
    },
    renderTemplate: function() {
        this._super();
    	this.render("profile");
    },
    title: function(tokens) {
    	return "KSI: profil - " + tokens.pop();
    },
    setupController: function(controller, model) {
        this.controllerFor('profile').setProperties({content:model});
    }
});
