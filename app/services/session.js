import Ember from 'ember';
import SessionService from 'ember-simple-auth/services/session';

export default SessionService.extend({
    store: Ember.inject.service(),
    setCurrentUser: function() {
	var self = this;
	return this.get("store").find("profile", "").then(function(user) {
	        self.set("current_user", user);
	    });
	}.observes("isAuthenticated")
});