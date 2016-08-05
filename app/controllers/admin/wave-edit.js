import Ember from "ember";

export default Ember.Controller.extend( {
    session: Ember.inject.service(),
    save_status: "",
    error_status: "",
    actions: {
        'wave-save': function() {
            var self = this;
            this.get("model.wave").save().then(function(){
                self.set("save_status", "Vlna uložena");
                //self.transitionToRoute('admin/waves');
            }, function(){
                self.set("error_status", "Špatná odpověď ze serveru! Zkus to za chvíli znovu. Pokud problém přetrvává, kontaktuj administrátora.");
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
