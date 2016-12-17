import Ember from "ember";
import InboundActions from 'ember-component-inbound-actions/inbound-actions';
import config from '../config/environment';

export default Ember.Component.extend(InboundActions, {
    tagName: "",
    classNames: [],
    session: Ember.inject.service(),
    general_error: "",

    fields: Ember.computed("module.fields", function() {
        if (!this.get("module.fields")) { return []; }
        var i = 0;
        return this.get("module.fields").map(function(field) {
            return Ember.Object.create({
                'index': i++,
                'text': field
            });
        });
    }),

    actions: {
        submit: function() {
            var self = this;
            this.set("general_error", "");
            if (!this.get("text")) {
                this.set("text", "");
            }

            var data = [];
            for(var i = 0; i < this.get("module.fields.length"); i++) {
                data.push(Ember.$("#module_text_" + this.get("module.id") + "_" + i).val());
            }
            this.get('session').authorize('authorizer:oauth2', function(header, h) {
                Ember.$.ajax({
                    url: config.API_LOC + "/modules/" + self.get("module.id") + "/submit",
                    data: JSON.stringify({ content: data }),
                    contentType: "application/json",
                    type: 'POST',
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader(header, h);
                    },
                    success: function(data) {
                        if ("result" in data) {
                            self.set("module.state", data.result);
                            if(!self.get("module.score")) {
                                self.set("module.score", self.get("store").createRecord("module-score"));
                            }
                            if (data.score !== undefined) {
                                self.set("module.score.score", data.score);
                            }
                            if ("error" in data) {
                                self.set("general_error", data.error);
                            }
                            if (data.result === "correct") {
                                self.sendAction("submit_succ_done");
                            } else if (data.result === "incorrect") {
                                self.set("general_error", "Tvé řešení není správné! Zkus to znovu.");
                            } else if (!("error" in data)) {
                                self.set("general_error", "Server odeslal neznámý result, kontaktuj organizátora.");
                            }
                        } else {
                            self.set("general_error", "Server neposlal result, kontaktuj organizátora.");
                        }
                        self.sendAction("submit_done");
                    },
                    error: function() {
                        self.set("general_error", "Server odpověděl chybovým kódem, kontaktuj organizátora.");
                        self.sendAction("submit_done");
                    }
                });
            });
        }
    }
});
