import Ember from "ember";
import InboundActions from 'ember-component-inbound-actions/inbound-actions';
import config from '../config/environment';
import moment from 'moment';

export default Ember.Component.extend(InboundActions, {
    tagName: "div",
    classNames: ["controls row"],
    session: Ember.inject.service(),

    general_error: "",
    show_error: false,

    didUpdate: function() {
        this._super();
        var self = this;
        // Documentation: https://github.com/voidberg/html5sortable
        var id = "#sortable" + this.get("module.id");
        window.sortable(id + "a, " + id + "b", {
            connectWith: ".connect" + this.get("module.id")
        })[0].addEventListener('sortstop', function() {
            if (self.get("general_error") && Ember.$(id + "b li").length !== 0) {
                self.set("general_error", "Musíš použít všechny řádky kódu!");
            }
            else {
                self.set("general_error", "");
            }
            self.update_indent();
        });
        this.update_indent();
    },
    update_indent: function() {
        var id = "#sortable" + this.get("module.id");
        var offset = 0;
        var k = 30;
        Ember.$(id + "a").find("li").each(function() {
            var current = Ember.$(this);
            current.css("padding-left", 5 + offset * k + "px");
            offset += parseInt(current.attr("data-offset"));
        });
        Ember.$(id + "b").find("li").each(function() {
            var current = Ember.$(this);
            current.css("padding-left", 5 + "px");
        });
    },
    actions: {
        submit: function() {
            var self = this;
            // Returns object with the solution or undefined if cannot submit
            var id = "#sortable" + self.get("module.id");
            if (Ember.$(id + "b li").length !== 0) {
                self.set("general_error", "Musíš použít všechny řádky kódu!");
                self.set("show_error", true);
                self.sendAction("submit_done");
                return;
            }
            self.set("general_error", "");

            // Collect the solution
            var result = [];
            Ember.$(id + "a li").each(function() {
                result.push(Ember.$(this).attr("id"));
            });

            this.get('session').authorize('authorizer:oauth2', function(header, h) {
                Ember.$.ajax({
                    url: config.API_LOC + "/modules/" + self.get("module.id") + "/submit",
                    data: JSON.stringify({ content: result }),
                    contentType: "application/json",
                    type: 'POST',
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader(header, h);
                    },
                    success: function(data) {
                        if("result" in data) {
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
                            } else if (data.result === 'incorrect') {
                                self.set("general_error", "Tvé řešení není správné! Zkus to znovu.");
                            } else if (!("error" in data)) {
                                self.set("general_error", "Server odeslal neznámý result, kontaktuj organizátora.");
                            }
                        } else {
                            self.set("general_error", "Server neposlal result, kontaktuj organizátora.");
                        }

                        if ("next" in data) {
                            self.set("general_error", self.get("general_error") + "<br>" +
                                "Další odevzdání možné " + (moment.utc(data.next)).local().format('LLL') + ".");
                        } else {
                            self.set("general_error", self.get("general_error") + "<br>" +
                                "Další odevzdání možné ihned.");
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
    },
});
