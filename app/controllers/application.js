import Ember from "ember";
import config from '../config/environment';

export default Ember.Controller.extend( {
	login_error_message: undefined, 
	actions: {
		login: function() {
			console.log("Action triggered!");
			var _this = this;
			var data = this.getProperties('identification', 'password');
			this.set('password', "");
			var authenticator = "simple-auth-authenticator:oauth2-password-grant";
			if (config.environment === "mockup_dev") {
				authenticator = "authenticator:basicauth";
			}
			this.get('session').authenticate(authenticator, data).then(function() {
				Ember.$('#login-modal').modal('hide');
			}, function(error) {
				console.log(error);
				_this.set('login_error_message', error);
			});
		},
		feedback: function() {
			console.log("Sending feedback!");
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