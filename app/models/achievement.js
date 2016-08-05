import DS from "ember-data";
import Ember from "ember";

export default DS.Model.extend( {
    active: DS.attr("boolean"),
    title: DS.attr("string"),
    picture: DS.attr("string"),
    description: DS.attr("string"),
    persistent: DS.attr("boolean"),
    year: DS.belongsTo("year", { async: true }),

    shortTitle: Ember.computed("title", function() {
        if (this.get("title")) {
            return this.get("title").substring(0,3) + ".";
        } else {
            return "";
        }
    })
});
