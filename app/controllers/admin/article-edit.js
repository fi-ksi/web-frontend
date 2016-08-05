import Ember from "ember";

export default Ember.Controller.extend( {
    session: Ember.inject.service(),
    save_status: "",
    error_status: "",
    saving: false,

    actions: {
        'article-save': function() {
            var self = this;
            this.set("saving", true);
            this.set("save_status", "");
            this.set("error_status", "");
            this.get("model").save().then(function(){
                self.set("saving", false);
                self.set("save_status", "Článek uložen.");
                setTimeout(function(){ self.set("save_status", ""); }, 5000);
            }, function(){
                self.set("saving", false);
                self.set("error_status", "Špatná odpověď ze serveru! Zkus to za chvíli znovu. Pokud problém přetrvává, kontaktuj organizátora.");
            });
        }
    },

});
