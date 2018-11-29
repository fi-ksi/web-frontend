import Ember from "ember";

export default Ember.Controller.extend( {
    session: Ember.inject.service(),

    orgs_current: Ember.computed("model", "session.year", function() {
        var year = this.get("session.year");
        return this.get("model").filter(function(item) {
            return item.get("seasons").map(function(i) {
                return Number(i.get("id"));
            }).contains(year);
        });
    }),

    orgs_other: Ember.computed("model", "session.year", function() {
        var year = this.get("session.year");
        return this.get("model").filter(function(item) {
            return !item.get("seasons").map(function(i) {
                return Number(i.get("id"));
            }).contains(year);
        });
    }),

});
