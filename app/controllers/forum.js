import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        new_thread: function() {
            this.set("new_thread", !this.get("new_thread"));
        }
    },
    new_thread: false
});
