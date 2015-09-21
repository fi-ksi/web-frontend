import Ember from "ember";

export default Ember.Component.extend({
	didInsertElement: function() {
		this._super();
		this.set("error_message", undefined);
	  	this.resizeBody();
	  	var self = this;
	  	Ember.$(window).on("window:resize", function() {
	  		self.resizeBody();
	  	});
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
	},
	resizeBody: function() {
		if(this.get("session.current_user.admin")) {
	     	Ember.$('body').css("padding-top", Ember.$("#navbar").height() + 70);
	  	}
	  	else {
	  		Ember.$('body').css("padding-top", Ember.$("#navbar").height()+30);
	  	}
	}.observes("session.current_user.admin")
});
