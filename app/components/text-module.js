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
    inputs: Ember.computed("module.fields", function() {
        var l = this.get("module.fields");
        var res = [];
        for(var i = 1; i <= l; i++) {
            res.push(i);
        }
        return res;
        //return Array.apply(null, {length: this.get("module.fields")}).map(Number.call, Number);
    }),
    actions: {
        submit: function() {
            var self = this;
            if (!this.get("text")) {
                this.set("text", "");
            }

            var data = [];
            for(var i = 0; i < this.get("module.fields"); i++) {
                data.push(Ember.$("#" + this.get("module.id") + "_" + i).val());
            }
            this.get('session').authorize('authorizer:oauth2', function(header, content) {
                Ember.$.ajax({
                    url: config.API_LOC + "/modules/" + self.get("module.id") + "/submit",
                    data: JSON.stringify({ content: data }),
                    contentType: "application/json",
                    type: 'POST',
                    headers: {
                        header: content
                    },
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
            });
        }
    }
});
