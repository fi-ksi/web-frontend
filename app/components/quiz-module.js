import Ember from "ember";
import InboundActions from 'ember-component-inbound-actions/inbound-actions';
import config from '../config/environment';
import moment from 'moment';

export default Ember.Component.extend(InboundActions, {
    tagName: "",
    classNames: [],
    session: Ember.inject.service(),

    general_error: undefined,
    show_message: false,
    script_message_output: undefined,
    script_message_mode: "danger",

    actions: {
        submit: function() {
            var self = this;
            var valid = true;
            var response = [];
            this.set("general_error", undefined);
            self.set("script_message_output", null);
            this.get("module.questions.questions").forEach(function(question, index) {
                var checked = Ember.$(".group_" + self.get("module.id") + "_" + index).filter(function() {
                    return Ember.$(this).is(":checked");
                });
                if(checked.length === 0) {
                    // there aren't checked items!
                    valid = false;
                    Ember.$("#w_" + self.get("module.id") + "_" + index).removeClass("hide");
                    response.push(undefined);
                } else {
                    Ember.$("#w_" + self.get("module.id") + "_" + index).addClass("hide");
                    var c = [];
                    checked.each(function() {
                        c.push(Ember.$(this).attr("id").split("_").pop());
                    });
                    response.push(c);
                }
            });

            if (valid) {
                self.get('session').authorize('authorizer:oauth2', function(header, header_content) {
                    Ember.$.ajax({
                        url: config.API_LOC + "/modules/" + self.get("module.id") + "/submit",
                        data: JSON.stringify({ content: response }),
                        contentType: "application/json",
                        type: 'POST',
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader(header, header_content);
                        },
                        success: function(data) {
                            if ("result" in data) {
                                self.set("script_message_mode", "danger");
                                self.set("module.blockClosing", false);
                                self.set("module.show_report", false);
                                if (!self.get("module.score")) {
                                    self.set("module.score", self.get("store").createRecord("module-score"));
                                }
                                if (data.score) {
                                    self.set("module.score.score", data.score);
                                }
                                if ("error" in data) {
                                    self.set("general_error", data.error);
                                }
                                if (data.result === "ok") {
                                    self.set("script_message_mode", "success");
                                    self.set("module.state", "correct");
                                    if ("message" in data && data.message.trim() !== "") {
                                        self.set("module.blockClosing", true);
                                    }
                                    self.sendAction("submit_succ_done");
                                } else if (data.result === "nok") {
                                    if (self.get("module.state") !== "correct"){
                                        self.set("module.state", "incorrect");
                                    }
                                    if ( !("message" in data && data.message.trim() !== "") ) {
                                        self.set("script_message_output", "Tvé řešení není správné! Zkus to znovu.");
                                    }
                                } else if (!("error" in data)) {
                                    self.set("module.show_report", true);
                                    self.set("general_error", "Server odeslal neznámý result, kontaktuj organizátora.");
                                }
                            } else {
                                self.set("general_error", "Server odeslal neznámý result, kontaktuj organizátora.");
                            }
                            if ("result" in data && data.result !== "ok"){
                                if ("next" in data) {
                                    self.set("script_message_output", self.get("script_message_output") + "<br>" +
                                        "Další odevzdání možné " + (moment.utc(data.next)).local().format('LLL') + ".");
                                } else {
                                    self.set("script_message_output", self.get("script_message_output") + "<br>" +
                                        "Další odevzdání možné ihned.");
                                }
                            }
                            if ("message" in data && data.message.trim() !== "") {
                                self.set("script_message_output", data.message.trim());
                            }
                            if ("report" in data && data.report.trim() !== "") {
                                self.set("module.report_output", data.report.trim());
                            }
                            self.sendAction("submit_done");
                        },
                        error: function() {
                            self.set("general_error", "Server odpověděl chybovým kódem, kontaktuj organizátora.");
                            self.sendAction("submit_done");
                        }
                    });
                });
            } else {
                self.sendAction("submit_done");
            }
        }
    }
});
