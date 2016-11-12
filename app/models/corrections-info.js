import DS from "ember-data";
import Ember from "ember";

export default DS.Model.extend( {
    title: DS.attr("string"),
    wave: DS.belongsTo("wave", { async: true }),
    author: DS.belongsTo("user", { async: true }),
    corr_state: DS.attr("string"),
    solvers: DS.hasMany("user", { async: true }),

    base: Ember.computed("corr_state", function() {
        return this.get("corr_state") === "base";
    }),
    working: Ember.computed("corr_state", function() {
        return this.get("corr_state") === "working";
    }),
    corrected: Ember.computed("corr_state", function() {
        return this.get("corr_state") === "corrected";
    }),
    published: Ember.computed("corr_state", function() {
        return this.get("corr_state") === "published";
    }),
});
