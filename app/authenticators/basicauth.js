import Base from 'simple-auth/authenticators/base';
import Ember from "ember";

export default Base.extend({
	restore: function(data) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            if (!Ember.isEmpty(data.username) && !Ember.isEmpty(data.pass)) {
                resolve(data);
            } else {
                reject();
            }
        });
    },
    authenticate: function(options) {
    	console.log("auth");
        return new Ember.RSVP.Promise(function(resolve, reject) {
        	console.log(options);
            var data = { username: options.identification, password: options.password };
            console.log(data);
            return Ember.$.ajax({
                url:         "http://localhost:3000/profile",
                type:        'GET',
                headers:    {
                    Authorization: window.btoa(data.username + ":" + data.password)
                }
            }).then(function(response) {
                if(response.profile && response.profile[0].signed_in) {
                	console.log("Resolved1");
                    resolve(response);
                }
                else {
                	console.log(response.profile[0]);
                	console.log("Rejected2");
                    reject("Špatné uživatelské jméno nebo heslo");
                }
            }, function() {
            	console.log("Rejected3");
                reject("Špatné uživatelské jméno nebo heslo");
            });
        });
    },
    invalidate: function(data) {
        data = {};
        return new Ember.RSVP.Promise(function(resolve) {
            resolve();
        });
    }
});