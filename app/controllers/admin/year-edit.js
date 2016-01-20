import Ember from "ember";

export default Ember.Controller.extend( {
    session: Ember.inject.service(),
    save_status: "",
    error_status: "",
    actions: {
        'year-save': function() {
            var self = this;

            self.set("save_status", "");
            self.set("error_status", "");
            self.set("saving", true);

            this.get("model").save().then(function(){
                self.set("save_status", "Ročník uložen");
                self.set("saving", false);
                self.get("store").unloadAll("year");
                self.transitionTo("admin/years");
            }, function(){
                self.set("error_status", "Špatná odpověď ze serveru! Zkus to za chvíli znovu. Pokud problém přetrvává, kontaktuj administrátora.");
                self.set("saving", false);
            });
        }
    },
});
