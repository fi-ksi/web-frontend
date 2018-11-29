import Ember from "ember";

export default Ember.Controller.extend( {
    store: Ember.inject.service(),
    session: Ember.inject.service(),

    can_save: Ember.computed("model.achievement.year.sealed", "session.current_user.admin", function(){
        return !this.get("model.achievement.year.sealed") || this.get("session.current_user.admin");
    }),

    actions: {
        'ach_select': function(ach_path) {
            this.set("model.achievement.picture", ach_path);
        },

        'save': function() {
            var self = this;
            this.set("saving", true);
            this.set("save_status", "");
            this.set("error_status", "");

            this.get("model.achievement").save().then(function() {
                self.set("saving", false);
                self.set("save_status", "Trofej uložena");
            }, function() {
                self.set("saving", false);
                self.set("error_status", "Špatná odpověď serveru! Kontaktuj administrátora.");
            });
        },

    },
});
