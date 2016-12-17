import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        'onClose': function() {
            this.sendAction("onClose");
        }
    }
});
