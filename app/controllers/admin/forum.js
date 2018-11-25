import Ember from "ember";

export default Ember.Controller.extend({
    store: Ember.inject.service(),
    session: Ember.inject.service(),

    published_waves: Ember.computed.filter('model', function(wave) { return wave.get("public"); } ),
    wave: Ember.computed.alias('published_waves.lastObject'),

    threads: [],

    load_threads: function() {
        var self = this;

        if (self.get("wave") === undefined) {
            self.set("threads", []);
            return;
        }

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

    }.observes("wave", "model"),

    actions: {
        'load': function() {
            this.load_threads();
        },

    }
});
