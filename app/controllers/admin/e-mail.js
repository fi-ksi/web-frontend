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
    easteregg: false,
    successful: false,
    error_status: "",
    send_status: "",
    years: Ember.computed("store", function() {
        return this.get("store").findAll("year");
    }),
    actions: {
        email: function() {
            var self = this;

            if(!self.get("to").length) {
                self.set("error_status", "není vybraný žádný ročník");
                return;
            } else {
                self.set("error_status", "");
            }

            var bcc = [];
            if(Ember.$("#bcc").val()) {
                bcc = Ember.$("#bcc").val().match(/[^\s,;]+/g);
            }

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
                            'Easteregg': self.get("easteregg"),
                            'Successful': self.get("successful")
                        }
                    }),
                    contentType: "application/json",
                    type: 'POST',
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader(header, h);
                        self.set("send_status", "Odesílám zprávu");
                    },
                    success: function(data) {
                        if("count" in data) {
                            self.set("send_status", "Zpráva úspěšně odeslána "+data.count+" súťažiacim.");
                        } else {
                            self.set("error_status", "Špatná odpověď serveru!");
                        }
                    },
                    error: function() {
                        self.set("error_status", "Špatná odpověď ze serveru! Zkus to za chvíli znovu. Pokud problém přetrvává, kontaktuj organizátora.");
                    }
                });
            });
        },
        to_select: function() {
            this.set("to", Ember.$("#to_sel").val().map(function(x){
                return parseInt(x);
            }));
        }
    }
});
