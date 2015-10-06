import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';
import Ember from "ember";

export default Ember.Controller.extend(LoginControllerMixin, {
	actions: {
		login: function() {
			var _this = this;
			var data = this.getProperties('identification', 'password');
			this.set('password', null);
			this.get('session').authenticate('authenticator:basicauth', data).then(null, function(error) {
				_this.set('errorMessage', error.error);
			});
		}
	}
});