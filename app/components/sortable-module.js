import Ember from "ember";
import InboundActions from 'ember-component-inbound-actions/inbound-actions';
import config from '../config/environment';

export default Ember.Component.extend(InboundActions, {
    tagName: "div",
    classNames: ["controls row"],
    didInsertElement: function() {
        this._super();
        Ember.run.scheduleOnce('afterRender', this, function(){
            var self = this;
            // Documentation: https://github.com/voidberg/html5sortable
            var id = "#sortable" + this.get("module.id");
            Ember.$(id + "a, " + id + "b").sortable({
                connectWith: ".connect" + this.get("module.id")
            }).bind('sortstop', function() {
                if (self.get("general_error") && Ember.$(id + "b li").length !== 0) {
                    self.set("general_error", "Musíš použít všechny řádky kódu!");
                }
                else {
                    self.set("general_error", undefined);
                }
            });
        });
    },
    actions: {
        submit: function() {
            var self = this;
            // Returns object with the solution or undefined if cannot submit
            var id = "#sortable" + self.get("module.id");
            if (Ember.$(id + "b li").length !== 0) {
                self.set("general_error", "Musíš použít všechny řádky kódu!");
                return;
            }
            self.set("general_error", undefined);

            // Collect the solution
            var result = [];
            Ember.$(id + "a li").each(function() {
                result.push(Ember.$(this).attr("id"));
            });

            Ember.$.ajax({
                url: config.API_LOC + "/modules/" + self.get("module.id") + "/submit",
                data: JSON.stringify({ content: result }),
                contentType: "application/json",
                type: 'POST',
                success: function(data) {
                    if("result" in data) {
                        self.set("module.state", data.result);
                        if("score" in data) {
                            if(!self.get("module.score")) {
                                self.set("module.score", self.get("store").createRecord("module-score"));
                            }
                            self.set("module.score.score", data.score);
                        }
                        self.sendAction("submit_done");
                    }
                    else {
                        self.set("general_error", "Špatná odpověď serveru");
                    }
                },
                error: function() {
                    self.set("general_error", "Špatná odpověď ze serveru");
                }
            });
        }
    },
    general_error: undefined
});
