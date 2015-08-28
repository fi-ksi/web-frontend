import DS from "ember-data";
import Ember from "ember";

export default DS.RESTAdapter.extend({
    host: "http://localhost:3000",
    //host: "http://172.22.46.58:8000",
    /*headers: Ember.computed(function() {
        if(!Ember.App.get("AuthManager").is_authorized()) {
            alert("No cookies!");
            return {};
        }
        var tok = Ember.App.get("AuthManager").get("auth_token");
        var acc = Ember.App.get("AuthManager").get("auth_acc");
        alert(acc + ":" + tok);
        return {
            Authorization: acc + ":" + tok
        };
    })*/
});

// Hack for singleton
var inflector = Ember.Inflector.inflector;
inflector.uncountable('profile');