import Ember from "ember";

export default Ember.Controller.extend( {
    session: Ember.inject.service(),
    save_status: "",
    error_status: "",

    orgs: Ember.computed("model.orgs", "model.year", function() {
        var year = this.get("model.year");
        return this.get("model.orgs").map(function(org) {
            org.set("active", org.get("seasons").contains(year));
            return org;
        });
    }),

    actions: {
        'year-save': function() {
            var self = this;

            self.set("save_status", "");
            self.set("error_status", "");
            self.set("saving", true);

            this.set("model.year.active_orgs", this.get("orgs").filterBy("active", true));

            this.get("model.year").save().then(function(){
                self.set("save_status", "Ročník uložen");
                self.set("saving", false);
                self.transitionTo("admin/years");
            }, function(){
                self.set("error_status", "Špatná odpověď ze serveru! Zkus to za chvíli znovu. Pokud problém přetrvává, kontaktuj administrátora.");
                self.set("saving", false);
            });
        }
    },
});
