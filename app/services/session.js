import Ember from 'ember';
import SessionService from 'ember-simple-auth/services/session';
import config from '../config/environment';

export default SessionService.extend({
    store: Ember.inject.service(),
    setCurrentUser: function() {
        var self = this;
        return this.get("store").find("basic-profile", "").then(function(user) {
            self.set("current_user", user);
        });
    }.observes("isAuthenticated"),

    year: null,
    years: [],

    years_sorted: Ember.computed.sort("years", function(a, b) {
        if (a.index < b.index) { return 1; }
        if (a.index > b.index) { return -1; }
        return 0;
    }),

    year_obj: Ember.computed("year", "years", function(){
        return this.get("years").findBy("id", this.get("year"));
    }),

    year_editable : Ember.computed("year_obj", "current_user", function(){
        return (!this.get("year_obj.sealed")) || (this.get("current_user.admin"));
    }),

    init() {
        this._super();

        // get last year
        /* this request must be done as AJAX
         * this.get('session').findAll('year')...
         * does not work (it leads to infinite recursion in the session service)
         */
        var self = this;
        Ember.$.ajax({
            url: config.API_LOC + "/years/",
            type: 'GET',
            success: function(data) {
                self.set('years', data['years']);
                self.set('year', data['years'].get('lastObject').id);
            },
            error: function() {
                self.set('years', []);
                self.set('year', 10);
            }
        });
    },

    unloadSensitive: function() {
        var store = this.get('store');
        store.unloadAll('achievement');
        store.unloadAll('article');
        store.unloadAll('atask');
        store.unloadAll('correction');
        store.unloadAll('corrections-info');
        store.unloadAll('task');
        store.unloadAll('task-detail');
        store.unloadAll('task-score');
        store.unloadAll('thread');
        store.unloadAll('thread-detail');
        store.unloadAll('post');
        store.unloadAll('module');
        store.unloadAll('module-score');
        store.unloadAll('user');
        store.unloadAll('wave');
    },

    changeYear: function(newyear) {
        this.set('year', newyear);
        this.unloadSensitive();
   }
});
