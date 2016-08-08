import Ember from "ember";

export default Ember.Controller.extend( {
    session: Ember.inject.service(),
    save_status: "",
    error_status: "",

    garant_id: Ember.computed("model.wave.garant", function(){
        return this.get("model.wave.garant.id");
    }),

    actions: {
        'wave-save': function() {
            var self = this;
            this.get("store").find("user", this.get("garant_id")).then(function(u){
                self.set("model.wave.garant", u);
                self.get("model.wave").save().then(function(){
                    self.set("save_status", "Vlna uložena");
                }, function(){
                    self.set("error_status", "Špatná odpověď ze serveru! Zkus to za chvíli znovu. Pokud problém přetrvává, kontaktuj administrátora.");
                });
            });
        }
    },

     canSave: Ember.computed("model.wave", "session.current_user", function(){
        var user = this.get("session.current_user");
        if (user) {
            return (user.get("admin")) || ((user.get("id") === this.get("model.wave.garant.id")) && (new Date() < this.get("model.wave.time_published")) && (!this.get("session.year_obj.sealed")));
        } else {
            return false;
        }
    }),

});
