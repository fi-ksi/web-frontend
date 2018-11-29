import Ember from "ember";

export default Ember.Controller.extend( {
    session: Ember.inject.service(),
    save_status: "",
    error_status: "",
    saving: false,

    actions: {
        'task-save': function() {
            var self = this;

            this.set("save_status", "");
            this.set("error_status", "");
            this.set("saving", true);

            this.get("model").save().then(function(){
                self.set("saving", false);
                self.set("save_status", "Úloha uložena.");
            }, function(){
                self.set("saving", false);
                self.set("error_status", "Chybová odpověď serveru! Kontaktuj administrátora.");
            });
        }
    },

    canSave: Ember.computed("model", "model.wave", "session.current_user", "model.wave.garant", "model.author", function(){
        var user = this.get("session.current_user");
        if (user) {
            return (user.get("admin")) || ((user.get("id") === this.get("model.wave.garant.id")) && (new Date() < this.get("model.wave.time_published")));
        } else {
            return undefined;
        }
    })

});
