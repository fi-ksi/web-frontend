import DS from "ember-data";
import Ember from "ember";
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import config from '../config/environment';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
	authorizer: 'authorizer:oauth2',
    host: config.API_LOC
});

// Hack for singleton
var inflector = Ember.Inflector.inflector;
inflector.uncountable('profile');
inflector.uncountable('settings');
