import Ember from "ember";
import config from '../config/environment';

export default Ember.Controller.extend( {
	login_error_message: undefined, 
	actions: {
		login: function() {
			var self = this;
			var data = this.getProperties('identification', 'password');
			this.set('password', "");
			var authenticator = "simple-auth-authenticator:oauth2-password-grant";
			if (config.environment === "mockup_dev") {
				authenticator = "authenticator:basicauth";
			}
			this.get('session').authenticate(authenticator, data).then(function() {
				Ember.$('#login-modal').modal('hide');
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
                    Ember.$('#feedback-modal').modal('hide');
                },
                error: function(j, e, error) {
                    self.set("feedback_error", error);
                }
            });
		}
	},
	currentPathDidChange: function() {
	    //App.set('currentPath', this.get('currentPath'));
	    //console.log("Path change: " + this.get("currentPath"));
	}.observes('currentPath')
});