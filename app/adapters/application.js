import DS from "ember-data";
import Ember from "ember";
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import config from '../config/environment';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
    authorizer: 'authorizer:oauth2',
    host: config.API_LOC,

    headers: Ember.computed('session.year', function() {
        var year = this.get('session.year');
        if (year) {
            return { 'year': year };
        } else {
            return {};
        }
    })
});

// Hack for singleton
var inflector = Ember.Inflector.inflector;
inflector.uncountable('profile');
inflector.uncountable('settings');
