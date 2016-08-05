import Ember from "ember";
import config from '../../config/environment';

export default Ember.Controller.extend({
    session: Ember.inject.service(),
    module_service: Ember.inject.service('module-service'),
    resubmit: false,
    opened: Ember.computed("model.time_deadline", function() {
        if(!this.get("model.time_deadline")) {
            return true;
        }
        var currentdate = new Date();
        if (this.get("model.time_deadline") > currentdate) {
            return true;
        }
        return false;
    }),
    mathObserver: function() {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }.observes("model", "model.details", "model.details.body"),
    finished: Ember.computed('model.details.modules.[]', function() {
        var res = true;
        var modules = this.get('model.details.modules');
        if (Ember.isEmpty(modules)) {
            return false;
        }
        modules.forEach(function(x) {
            res &= x.get("is_correct");
        });
        return res;
    }),
    module_ids: Ember.computed("model", function() {
        return this.get("model.modules").map(function(module) { return "module_" + module.get("id"); });
    }),
    submit_error: "",
    submit_all: function() {
        var self = this;
        this.set("submit_error", "");
        if(this.get("module_ids").every(function(id) { return id in self.get("results"); } )) {
            // Check if all components have suceeed
            if(this.get("module_ids").every(function(id) {return self.get("results." + id + ".type") === "success"; })) {
                // Send all items!
                var data = new FormData();
                var results = this.get("results");

                for (var property in results) {
                    if (results.hasOwnProperty(property)) {
                        var result = results[property]["data"];
                        if("files" in result) {
                            // This is file module
                            for (var i = 0; i !== result["files"].length; i++) {
                                data.append(property + "_file_" + i, result["files"][i]);
                            }
                        } else {
                            data.append(property, JSON.stringify(result));
                        }
                    }
                }

                // Send it
                Ember.$.ajax({
                    url: config.API_LOC + "/task/" + this.get("model.id") + "/submit",
                    data: data,
                    processData: false,
                    contentType: false,
                    type: 'POST',
                    success: function(data){
                        alert(data);
                        this.get("model").reload();
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        self.set("submit_error", errorThrown);
                    }
                });
            } else {
                // Scroll to highest error
                var elems = Ember.$(".alert-danger");
                var offset = Math.min.apply(null, Ember.$.map(elems, function(elem) { return Ember.$(elem).offset().top; }));
                Ember.$('html, body').animate({
                    scrollTop: offset - 150 //Magic constant
                }, "slow");
            }
        }
    },
    actions: {
        submit: function() {
            var self = this;
            this.get("model").reload().then(function(e) {
                e.get("details").then(function(d) {
                    d.reload().then(function(nd) {
                        var res = true;
                        var modules = nd.get('modules');
                        if (!modules) {
                            self.set("finished", false);
                        }
                        modules.forEach(function(x) {
                            res &= x.get("is_correct");
                        });
                        self.set("finished", res);
                    });
                });
            });
       }
    }
});
