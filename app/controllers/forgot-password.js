import Ember from "ember";
import config from '../config/environment';

export default Ember.Controller.extend( {
    actions: {
        send: function() {
            var self = this;
            this.set("general_error", undefined);

            Ember.$.ajax({
                url: config.API_LOC + "/forgottenPassword",
                data: JSON.stringify(self.get("model")),
                contentType: "application/json",
                type: 'POST',
                success: function() {
                    self.set("finished", true);
                },
                error: function() {
                    self.set("general_error", "Špatná odpověď ze serveru");
                }
            });
        }
    }
});
