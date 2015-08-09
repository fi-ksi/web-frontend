import DS from "ember-data";
import Ember from "ember";

export default DS.RESTAdapter.extend({
  //host: "http://private-0dd5a-ksi1.apiary-mock.com"
  host: "http://localhost:3000"
});

// Hack for singleton
var inflector = Ember.Inflector.inflector;
inflector.uncountable('profile');