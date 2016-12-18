import Ember from "ember";

export default Ember.Controller.extend( {
    session: Ember.inject.service(),
    save_status: "",
    error_status: "",
    saving: false,

    garant_id: Ember.computed("model.wave.garant", function(){
        return this.get("model.wave.garant.id");
    }),

    actions: {
        'wave-save': function() {
            var self = this;

            this.set("saving", true);
            this.set("save_status", "");
            this.set("error_status", "");

            this.get("store").find("user", this.get("garant_id")).then(function(u){
                self.set("model.wave.garant", u);
                self.get("model.wave").save().then(function(){
                    self.set("saving", false);
                    self.set("save_status", "Vlna uložena");
                }, function(){
                    self.set("saving", false);
                    self.set("error_status", "Chybová odpověď serveru! Kontaktuj administrátora.");
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
