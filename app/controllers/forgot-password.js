import Ember from "ember";
import config from '../config/environment';

export default Ember.Controller.extend( {
    general_error: "",
    sending: false,

    actions: {
        send: function() {
            var self = this;
            this.set("general_error", "");
            this.set("sending", true);

            Ember.$.ajax({
                url: config.API_LOC + "/forgottenPassword",
                data: JSON.stringify(self.get("model")),
                contentType: "application/json",
                type: 'POST',
                success: function() {
                    self.set("finished", true);
                    self.set("sending", false);
                },
                error: function(xhr) {
                    self.set("sending", false);

                    if (xhr.status === 400) {
                        self.set("general_error", "Tento e-mail nemáme v databázi!");
                    } else {
                        self.set("general_error", "Špatná odpověď serveru, kontaktuj organizátora!");
                    }
                }
            });
        }
    }
});
