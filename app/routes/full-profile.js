import Ember from "ember";
import ResetScroll from '../mixins/reset-scroll';

export default Ember.Route.extend(ResetScroll, {
    session: Ember.inject.service(),

    model: function(params) {
        this.store.unloadAll("profile");
        return this.store.find("profile", params["profile_id"]);
    },
    titleToken: function(model) {
        return model.get("full_name");
    },
    renderTemplate: function() {
        this.render("profile", { controller: 'profile' });
    },
    title: function(tokens) {
        return "KSI: profil – " + tokens.pop();
    },
    afterModel: function() {
        var self = this;
        return this.store.findAll("wave").then(function(result) {
            self.set("waves", result);
        });
    },
    setupController: function(controller, model) {
        //this.register('session:current', App.Session, {singleton: true});
        //this.inject('controller:profile', 'session', 'session:current');
        this.controllerFor('profile').setProperties({content:model, fullProfile: true, waves: this.get('waves')});
    }
});
