import Ember from "ember";
import InboundActions from 'ember-component-inbound-actions/inbound-actions';
import config from '../config/environment';

export default Ember.Component.extend(InboundActions, {
    tagName: "",
    classNames: [],
    didInsertElement: function() {
        this._super();
        Ember.run.scheduleOnce("afterRender", this, function(){
            
        }); 
    },
    actions: {
        submit: function() {
            var self = this;
            if (!this.get("text")) {
                this.set("text", "");
            }
            Ember.$.ajax({
                url: config.API_LOC + "/modules/" + self.get("module.id") + "/submit",
                data: JSON.stringify({ content: this.get("text") }),
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
                            if(!data.score) {
                                self.set("general_error", "Tvé řešení není správné! Zkus to znovu.");
                            }
                        }
                        self.sendAction("submit_done");
                    }
                    else {
                        self.set("general_error", "Špatná odpověď serveru");
                    }
                },
                error: function() {
                    self.set("general_error", "Špatná odpověď ze serveru.");
                }
            });
        }
    }
});