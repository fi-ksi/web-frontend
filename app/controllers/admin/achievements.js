import Ember from "ember";

export default Ember.Controller.extend( {
    store: Ember.inject.service(),
    session: Ember.inject.service(),

    actions: {
        'achievement-delete': function(achievement) {
            if(!confirm("Opravdu odstranit trofej " + achievement.get("title") + " a veškerá její přidělení?")) {
                return;
            }

             achievement.set("deleting", true);
             achievement.destroyRecord(); // DELETE to /admin/achievements/1
        },
    },
});
