import DS from "ember-data";
import Ember from "ember";
import config from '../config/environment';

export default DS.Model.extend( {
    title: DS.attr("string"),
    picture: DS.attr("string"),
    body: DS.attr("string"),
    description: DS.attr("string"),

    picture_r: Ember.computed("picture", function() {
        return config.API_LOC + this.get("picture");
    })
});
