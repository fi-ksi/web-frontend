import DS from "ember-data";
import Ember from "ember";

export default DS.Model.extend( {
    code: DS.attr("string"),
    module: DS.belongsTo("module", { async: true }),
    report: DS.attr("string"),
    result: DS.attr("string"),
    time: DS.attr("date"),
    user: DS.belongsTo("user", { async: true }),

    ok: Ember.computed("result", function() {
        return this.get("result") === "ok";
    }),
    nok: Ember.computed("result", function() {
        return this.get("result") === "nok";
    }),
    error: Ember.computed("result", function() {
        return this.get("result") === "error";
    }),
});
