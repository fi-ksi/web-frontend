import DS from "ember-data";
import Ember from "ember";
import App from "../app";

export default DS.RESTAdapter.extend({
    host: "http://localhost:3000"
    //host: "http://172.22.46.58:8000",
    //host: "http://192.168.1.127:8000"
});

// Hack for singleton
var inflector = Ember.Inflector.inflector;
inflector.uncountable('profile');
inflector.uncountable('settings');
