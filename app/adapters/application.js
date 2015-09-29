import DS from "ember-data";
import Ember from "ember";
import config from '../config/environment';

export default DS.RESTAdapter.extend({
    host: config.API_LOC
});

// Hack for singleton
var inflector = Ember.Inflector.inflector;
inflector.uncountable('profile');
inflector.uncountable('settings');
