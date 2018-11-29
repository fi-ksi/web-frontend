import Ember from "ember";

export default Ember.Controller.extend( {
    store: Ember.inject.service(),
    session: Ember.inject.service(),

    achs_persistent: Ember.computed.filter('model', function(ach) { return ach.get("persistent"); } ),
    achs_current: Ember.computed.filter('model', function(ach) { return !ach.get("persistent"); } ),

    actions: {
        'achievement-delete': function(achievement) {
            if(!confirm("Opravdu odstranit trofej " + achievement.get("title") + " a veškerá její přidělení?")) {
                return;
            }

             achievement.set("deleting", true);
             achievement.destroyRecord().then({}, function(error) {
                achievement.set("deleting", false);
                alert("Trofej se nepodařilo odstranit, kontaktuj administrátora:\n" + error);
             });
        },

        'achievement-grant': function(achievement) {
            this.transitionTo("admin/achievement-grant", {queryParams: {achievement: achievement.id}});
        },
    },
});
