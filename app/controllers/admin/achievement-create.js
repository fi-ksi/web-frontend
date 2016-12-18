import Ember from "ember";

export default Ember.Controller.extend( {
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    saving: false,

    title: "",
    picture: "",
    description: "",

    persistent: Ember.computed("session.year_obj.sealed", function() {
        return this.get("session.year_obj.sealed");
    }),

    actions: {
        'ach_select': function(ach_path) {
            this.set("picture", ach_path);
        },

        'ach-create': function() {
            var self = this;

            if (!this.get("picture")) {
                alert("Vyber obrázek!");
                return;
            }

            this.set("error_status", "");
            this.set("saving", true);

            this.get("store").createRecord('achievement', {
                title: this.get("title"),
                picture: this.get("picture"),
                description: this.get("description"),
                persistent: this.get("persistent") || this.get("session.year_obj.sealed"),
            }).save().then(function() {
                self.set("saving", false);
                self.transitionToRoute('admin/achievements');
            }, function () {
                self.set("saving", false);
                self.set("error_status", "Špatná odpověď serveru! Kontaktuj administrátora.");
            });
        }
    },

});
