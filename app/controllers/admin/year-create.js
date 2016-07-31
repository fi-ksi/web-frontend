import Ember from "ember";

export default Ember.Controller.extend( {
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    saving: false,

    year: Ember.computed("model", function(){
        var curYear = new Date().getFullYear();
        return curYear.toString() + " / " + (curYear+1).toString();
    }),

    index: Ember.computed("model", function(){
        return this.get("model.lastObject.index") + 1;
    }),

    actions: {
        'year-create': function() {
            var self = this;

            this.set("error_status", "");
            this.set("saving", true);

            this.get("store").createRecord('year', {
                index: this.get("index"),
                year: this.get("year"),
                sealed: false,
            }).save().then(function() {
                self.set("saving", false);
                self.get("store").unloadAll("year");
                self.transitionToRoute('admin/years');
            }, function () {
                self.set("saving", false);
                self.set("error_status", "Špatná odpověď ze serveru! Zkus to za chvíli znovu. Pokud problém přetrvává, kontaktuj organizátora.");
            });
        }
    },

});
