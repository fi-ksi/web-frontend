import Ember from "ember";
import config from '../config/environment';

export default Ember.Controller.extend( {
	session: Ember.inject.service(),
	login_error_message: undefined, 
	in_progress: false,
	actions: {
		login: function() {
			var self = this;
			const { identification, password } = this.getProperties('identification', 'password');
			this.set('password', "");
			this.set('in_progress', true);
			this.get('session').authenticate('authenticator:oauth2', identification, password).then(function() {
				self.set('in_progress', false);
				Ember.$('#login-modal').modal('hide');
				var store = self.get("store");
				store.unloadAll("task");
				store.unloadAll("task-detail");
				store.unloadAll("thread");
				store.unloadAll("thread-detail");
				store.unloadAll("post");
				store.unloadAll("module");
				store.unloadAll("module-score");
				store.unloadAll("achievement");
				store.unloadAll("task-score");
			}, function(error) {
				self.set('in_progress', false);
				if ("error" in error) {
					if(error.error === "unauthorized_client") {
						self.set('login_error_message', "Neexistující uživatel nebo špatné heslo");
					} else {
						console.log(error.error);
						self.set('login_error_message', "Interní chyba přihlášení: " + error.error);
					}
				} else {
					self.set('login_error_message', "Interní chyba serveru: " + error.error);
				}		
			});
		},
		feedback: function() {
			var self = this;
            this.set("feedback_error", undefined);

            var obj = {
            	body: this.get("feedback_text"),
            	email: this.get("feedback_email")
            };

            Ember.$.ajax({
                url: config.API_LOC + "/feedback",
                data: JSON.stringify(obj),
                contentType: "application/json",
                type: 'POST',
                success: function() {
                	self.set("feedback_email", "");
                    self.set("feedback_text", "");
                    Ember.$('#feedback-modal').modal('hide');
                },
                error: function() {
                    self.set("feedback_error", "Špatná odpověď ze serveru");
                }
            });
		}
	},
	currentPathDidChange: function() {
	    //App.set('currentPath', this.get('currentPath'));
	    //console.log("Path change: " + this.get("currentPath"));
	}.observes('currentPath')
});
