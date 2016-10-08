import Ember from "ember";
import InboundActions from 'ember-component-inbound-actions/inbound-actions';
import config from '../config/environment';

export default Ember.Component.extend(InboundActions, {
    tagName: "",
    classNames: [],
    session: Ember.inject.service(),

    actions: {
        submit: function() {
            var self = this;
            var valid = true;
            var response = [];
            this.set("general_error", undefined);
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
            if(valid) {
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
                            if("result" in data) {
                                self.set("module.state", data.result);
                                if(!self.get("module.score")) {
                                    self.set("module.score", self.get("store").createRecord("module-score"));
                                }
                                if (data.score) {
                                    self.set("module.score.score", data.score);
                                } else {
                                    self.set("general_error", "Tvé řešení není správné! Zkus to znovu.");
                                }
                                if (data.result === "correct") { self.sendAction("submit_succ_done");}
                            }
                            else {
                                self.set("general_error", "Špatná odpověď serveru");
                            }
                            self.sendAction("submit_done");
                        },
                        error: function() {
                            self.set("general_error", "Špatná odpověď ze serveru.");
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
