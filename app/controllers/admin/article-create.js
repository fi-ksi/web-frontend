import Ember from "ember";

export default Ember.Controller.extend( {
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    saving: false,

    time_published: new Date(),

    actions: {
        'article-create': function() {
            var self = this;

            this.set("saving", true);

            var pict;
            if (this.get("picture") === "") {
                pict = null;
            } else {
                pict = this.get("picture");
            }

            this.get("store").createRecord('article', {
                title: this.get("title"),
                time_published: this.get("time_published"),
                picture: pict,
                body: this.get("body"),
                published: this.get("published"),
                resource: null,
            }).save().then(function() {
                self.set("saving", false);
                self.transitionToRoute('admin/articles');
            }, function () {
                self.set("saving", false);
                self.set("error_status", "Špatná odpověď ze serveru! Zkus to za chvíli znovu. Pokud problém přetrvává, kontaktuj organizátora.");
            });
        }
    },

});
