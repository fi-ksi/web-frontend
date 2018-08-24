import Ember from 'ember';

export default Ember.Component.extend({
    session: Ember.inject.service(),
    store: Ember.inject.service(),

    save: function() {
        var self = this;
        this.set("statemsg", "Ukládám");
        this.get("model").save().then(
            function() {
                self.set("statemsg", "Uloženo");
            },
            function() {
                self.set("statemsg", "Chyba! při ukládání. Zkus znovu");
            }
        );
    },

    statemsg: "Uloženo",
    actions: {
        saveTest: function() {
            this.save();
        },
    },
});
