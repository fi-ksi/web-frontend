import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        react: function() {
            this.set("is_reacting", !this.get("is_reacting"));
        }
    },
    is_reacting: false
});
