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
});