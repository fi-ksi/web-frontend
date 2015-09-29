import Ember from "ember";
import config from '../config/environment';

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
		logout: function() {
			Ember.$.ajax({
                url: config.API_LOC + "/logout",
                data: {},
                contentType: "application/json",
                type: 'GET'
            });
			this.get('session').invalidate();
		}
	},
	resizeBody: function() {
		if(this.get("session.current_user.admin")) {
			console.log("Admin!");
	     	Ember.$('body').css("padding-top", Ember.$("#navbar").height() + 150);
	  	}
	  	else {
	  		console.log("User!");
	  		Ember.$('body').css("padding-top", Ember.$("#navbar").height()+30);
	  	}
	}.observes("session.current_user.admin")
});
