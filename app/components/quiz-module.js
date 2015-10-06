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
            var valid = true;
            var response = [];
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
                Ember.$.ajax({
                    url: config.API_LOC + "/modules/" + self.get("module.id") + "/submit",
                    data: JSON.stringify({ content: response }),
                    contentType: "application/json",
                    type: 'POST',
                    success: function(data) {
                        if("result" in data) {
                            self.set("module.state", data.result);
                            if("score" in data) {
                                if(!this.get("module.score")) {
                                    this.set("module.score", this.get("store").createRecord("module-score"));
                                }
                                this.set("module.score.score", data.score.score);
                                if("reviewed_by" in data.score) {
                                    this.set("module.score.reviewed_by", data.score.reviewed_by);
                                }
                            }
                            self.sendAction("submit_done");
                        }
                        else {
                            self.set("general_error", "Špatná odpověď serveru");
                        }
                    },
                    error: function(j, e, error) {
                        self.set("general_error", error);
                    }
                });
            }
        }
    }
});