import Ember from "ember";
import config from '../../config/environment';

export default Ember.Controller.extend({
    store: Ember.inject.service(),
    session: Ember.inject.service(),
    subject: "[KSI]",
    text: "",
    replyTo: "ksi@fi.muni.cz",
    to: [],
    category:"both",
    gender: "both",
    karlikSign: true,
    successful: false,
    error_status: "",
    send_status: "",
    type: "",
    sending: false,
    error_show: false,
    years_raw: Ember.computed("store", function() {
        return this.get("store").findAll("year");
    }),
    years: Ember.computed.sort("years_raw", function(a, b) {
        if (a.get("index") < b.get("index")) { return 1; }
        if (a.get("index") > b.get("index")) { return -1; }
        return 0;
    }),
    actions: {
        email: function() {
            var self = this;
            this.set("send_status", "");
            this.set("error_status", "");

            if(!this.get("to").length) {
                this.set("error_status", "Není vybraný ročník!");
                this.set("error_show", true);
                return;
            }
            if(this.get("type") === "") {
                this.set("error_status", "Je třeba vybrat typ zprávy!");
                this.set("error_show", true);
                return;
            }
            if(this.get("subject") === "[KSI]") {
                this.set("error_status", "Zapomněl jsi vyplnit předmět zprávy!");
                this.set("error_show", true);
                return;
            }

            this.set("sending", true);
            this.set("error_show", false);

            var bcc = [];
            if(Ember.$("#bcc").val()) {
                bcc = Ember.$("#bcc").val().match(/[^\s,;]+/g);
            }

            this.get('session').authorize('authorizer:oauth2', function(header, h) {
                Ember.$.ajax({
                    url: config.API_LOC + "/admin/e-mail/",
                    data: JSON.stringify({
                        "e-mail": {
                            'Subject': self.get("subject"),
                            'Body': self.get("text"),
                            'Reply-To': self.get("replyTo"),
                            'To': self.get("to"),
                            'Bcc': bcc,
                            'Gender': self.get("gender"),
                            'Category': self.get("category"),
                            'KarlikSign': self.get("karlikSign"),
                            'Successful': self.get("successful"),
                            'Type': self.get("type"),
                        }
                    }),
                    contentType: "application/json",
                    type: 'POST',
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader(header, h);
                    },
                    success: function(data) {
                        self.set("sending", false);
                        if("count" in data) {
                            self.set("send_status", "Zpráva úspěšně odeslána "+data.count+" řešitelům.");
                        } else {
                            self.set("error_status", "Server neposlal count, kontaktuj administrátora!");
                        }
                    },
                    error: function() {
                        self.set("sending", false);
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
