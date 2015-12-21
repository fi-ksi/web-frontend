import Ember from "ember";
import config from '../../config/environment';

export default Ember.Controller.extend({
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    subject: "[KSI]",
    text: "",
    sender: "",
    replyTo: "ksi@fi.muni.cz",
    to: [],
    gender: "both",
    karlikSign: true,
    eastergg: false,
    years: Ember.computed("store", function() {
        return this.get("store").find("year");
    }),
    actions: {
        email: function() {
            var self = this;

            var bcc = Ember.$("#bcc").val().match(/[^\s,;]+/g);

            self.get('session').authorize('authorizer:oauth2', function(header, h) {
                Ember.$.ajax({
                    url: config.API_LOC + "/admin/e-mail/",
                    data: JSON.stringify({
                        "e-mail": {
                            'Subject': self.get("subject"),
                            'Body': self.get("text"),
                            'Sender': self.get("sender"),
                            'Reply-To': self.get("replyTo"),
                            'To': self.get("to"),
                            'Bcc': bcc,
                            'Gender': self.get("gender"),
                            'KarlikSign': self.get("karlikSign"),
                            'Eastergg': self.get("eastergg")
                        }
                    }),
                    contentType: "application/json",
                    type: 'POST',
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader(header, h);
                    },
                    success: function(data) {
                        console.log(data);
                        self.set("general_info", null);
                        if("result" in data) {

                        } else {
                            self.set("general_error", "Špatná odpověď serveru");
                        }
                        if ("output" in data) {
                            self.set("script_text_output", data.output.trim());
                        }
                    },
                    error: function() {
                        self.set("submission_info", "Špatná odpověď ze serveru. Zkus to za chvíli znovu. Pokud problém přetrvává, kontaktuj organizátora.");
                    }
                });
            });
        },
        to_select: function() {
            this.set("to", Ember.$("#to_sel").val());
        }
    }
});