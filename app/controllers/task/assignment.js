import Ember from "ember";

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
