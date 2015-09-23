import Ember from "ember";

export default Ember.Controller.extend( {
	login_error_message: undefined, 
	actions: {
		login: function() {
			console.log("Action triggered!");
			var _this = this;
			var data = this.getProperties('identification', 'password');
			this.set('password', "");
			this.get('session').authenticate('authenticator:basicauth', data).then(function() {
			//this.get("session").authenticate("simple-auth-authenticator:oauth2-password-grant", data).then(function() {
				Ember.$('#login-modal').modal('hide');
			}, function(error) {
				console.log(error);
				_this.set('login_error_message', error);
			});
		},
		logout: function() {
			this.get('session').invalidate();
		}
	},
	currentPathDidChange: function() {
	    //App.set('currentPath', this.get('currentPath'));
	    //console.log("Path change: " + this.get("currentPath"));
	}.observes('currentPath')
});