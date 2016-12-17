import Ember from 'ember';

/* This components provides onClose event.
 * However, when event is non binded from parent, no error is generated, but
 * whole html element is just removed.
 * When message changes, the element automatically shows again.
 */

export default Ember.Component.extend({
    text: "",          // Change this value to display text.

    show: true,        // You can change this value from parent to show or hide
                       // the message.
    reShow: true,      // If you change this value to "false" from parent,
                       // message will not show again if it changes.
    closeBtn: false,   // Change this value from parent to show/hide close btn.

    type: "info",      // Change this value to change dialog type.
                       // This type is exactly bootstrap type.

    textObserver: function() {
        if (this.get("reShow")) {
            this.set("show", true);
        }
    }.observes("text"),

    actions: {
        'onClose': function() {
            if (this.get("onClose")) {
                // Action to parent exists -> send it
                this.sendAction("onClose");
            } else {
                // No action to parent -> dismiss dialog
                this.set("show", false);
            }
        }
    }
});
