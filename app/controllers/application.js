import Ember from "ember";
import config from '../config/environment';

export default Ember.Controller.extend( {
	session: Ember.inject.service(),
	login_error_message: undefined, 
	actions: {
		login: function() {
			var self = this;
			const { identification, password } = this.getProperties('identification', 'password');
			this.set('password', "");
			this.get('session').authenticate('authenticator:oauth2', identification, password).then(function() {
				Ember.$('#login-modal').modal('hide');
				var store = this.get("store");
				store.unload("task");
				store.unload("task-detail");
				store.unload("thread");
				store.unload("thread-detail");
				store.unload("post");
				store.unload("module");
				store.unload("module-score");
				store.unload("achievement");
				store.unload("task-score");
			}, function(error) {
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