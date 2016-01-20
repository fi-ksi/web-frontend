import Ember from "ember";

export default Ember.Controller.extend({
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    wave: Ember.computed.alias('model.lastObject'),
    threads: [],

    load_threads: function() {
        var self = this;

        self.set("loading", true);

        self.get("store").query("thread", { "wave": self.get("wave.id") }).then(function(p) {
            self.set("threads", p);
            self.set("loading", false);
        }, function(error) {
            console.log(error);
            self.set("loading", false);
            self.set("threads", []);
            alert("Nepodařilo se načíst data ze serveru : "+error.message);
        });

    },

    actions: {
        'load': function() {
            this.load_threads();
        },

    }
});
