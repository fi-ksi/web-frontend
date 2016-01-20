import Ember from "ember";

export default Ember.Controller.extend( {
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    saving: false,

    caption: "",
    time_published: new Date(),
    garant: Ember.computed.alias('model.users.firstObject'),
    index: Ember.computed("model.waves", function(){
        return this.get("model.waves.length") + 1;
    }),

    actions: {
        'wave-create': function() {
            var self = this;

            this.set("error_status", "");
            this.set("saving", true);

            this.get("store").createRecord('wave', {
                caption: this.get("caption"),
                garant: this.get("garant"),
                time_published: this.get("time_published"),
                index: this.get("index"),
            }).save().then(function() {
                self.set("saving", false);
                self.transitionToRoute('admin/waves');
            }, function () {
                self.set("saving", false);
                self.set("error_status", "Špatná odpověď ze serveru! Zkus to za chvíli znovu. Pokud problém přetrvává, kontaktuj organizátora.");
            });
        }
    },

});
