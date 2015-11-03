import Ember from "ember";
import config from '../config/environment';

export default Ember.Component.extend({
	session: Ember.inject.service(),
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
		logout: function() {
			var self = this;
			this.get('session').authorize('authorizer:oauth2', function(header, content) {
				Ember.$.ajax({
	                url: config.API_LOC + "/logout",
	                data: {},
	                contentType: "application/json",
	                type: 'GET',
	                headers: {
	                	header: content
	                },
	                success: function() {
	                	self.get("session").invalidate();
	                },
	                error: function() {
	                	self.get("session").invalidate();
	                }
	            });
	        });
		}
	},
	resizeBody: function() {
		if(this.get("session.current_user.admin")) {
	     	Ember.$('body').css("padding-top", Ember.$("#navbar").height() + 150);
	  	}
	  	else {
	  		Ember.$('body').css("padding-top", Ember.$("#navbar").height()+30);
	  	}
	}.observes("session.current_user.admin")
});
