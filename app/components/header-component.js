import Ember from "ember";

export default Ember.Component.extend({
	didInsertElement: function() {
		this.set("error_message", undefined);
		if(this.get("model").get("admin")) {
	     	Ember.$('body').toggleClass("body-admin");
	  	}
	  	else {
	  		Ember.$('body').toggleClass("body-user");
	  	}
	},
	actions: {
		login: function() {
			var _this = this;
			var data = this.getProperties('identification', 'password');
			this.set('password', "");
			this.get('session').authenticate('authenticator:basicauth', data).then(function() {
				Ember.$('#login-modal').modal('hide');
			}, function(error) {
				console.log(error);
				_this.set('error_message', error);
			});
		},
		logout: function() {
			this.get('session').invalidate();
		}
	}
});
