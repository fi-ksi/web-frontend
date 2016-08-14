import Ember from "ember";
import ResetScrollProtected from '../mixins/reset-scroll-protected';

export default Ember.Route.extend(ResetScrollProtected, {
    model: function() {
        this.store.unloadAll("profile");
        return this.store.find("profile", "");
    },

    afterModel: function(model) {
        var self = this;
        return this.store.findAll("wave").then(function(result) {
            self.set("waves", result);
        });
    },

    setupController: function(controller, model) {
        this._super(controller,model);
        controller.set('waves', this.get('waves'));
        controller.set('fullProfile', true);
    },

    title: "KSI: Profil"
});
