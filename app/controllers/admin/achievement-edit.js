import Ember from "ember";

export default Ember.Controller.extend( {
    store: Ember.inject.service(),
    session: Ember.inject.service(),

    actions: {
        'ach_select': function(ach_path) {
            this.set("model.achievement.picture", ach_path);
        },

        'save': function() {
            var self = this;
            this.set("saving", true);
            this.set("save_status", null);
            this.get("model.achievement").save().then(function() {
                self.set("saving", false);
                self.set("save_status", "Trofej uložena");
            }, function() {
                self.set("saving", false);
                alert("Špatná odpověď serveru! Kontaktuj administrátora");
            });
        },

    },
});
