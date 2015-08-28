import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

var App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver,
  AuthManager: Ember.Object.extend({
    init: function() {
        this._super();
        var auth_token = Ember.$.cookie("auth_token");
        var auth_acc = Ember.$.cookie("auth_account");
        if (!Ember.isEmpty(auth_token) && !Ember.isEmpty(auth_acc)) {
            this.authenticate(auth_token, auth_acc);
        }
        else {
            this.set("auth_token", undefined);
            this.set("auth_acc", undefined);
        }
    },

    authenticate: function(auth_token, auth_acc) {
        this.set("auth_token", auth_token);
        this.set("auth_acc", auth_acc);
        Ember.$.cookie("auth_token", auth_token);
        Ember.$.cookie("auth_acc", auth_token);
    },

    unauthenticate: function() {
        Ember.$.removeCookie("auth_token");
        Ember.$.removeCookie("auth_acc");
        this.set("auth_token", undefined);
        this.set("auth_acc", undefined);
    },

    is_authenticated: function() {
        return this.get("auth_token") !== undefined && this.get("auth_acc") !== undefined;
    }
  })
});

loadInitializers(App, config.modulePrefix);

export default App;
