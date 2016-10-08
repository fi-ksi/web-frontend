import Ember from "ember";
import InboundActions from 'ember-component-inbound-actions/inbound-actions';
import config from '../config/environment';

export default Ember.Component.extend(InboundActions, {
    tagName: "div",
    classNames: ["controls row"],
    session: Ember.inject.service(),
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
                self.set("general_error", undefined);
            }
            self.update_indent();
        });
        this.update_indent();
    },
    mathObserver: Ember.computed("module", function() {
        Ember.run.later(this, function() {
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        }, 500);
    }),
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
                self.sendAction("submit_done");
                return;
            }
            self.set("general_error", undefined);

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
                        self.set("general_error", "Špatná odpověď ze serveru");
                        self.sendAction("submit_done");
                    }
                });
            });
        }
    },
    general_error: undefined
});
