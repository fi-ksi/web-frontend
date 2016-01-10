import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
    session: Ember.inject.service(),
    store: Ember.inject.service(),
    lastInput: undefined,
	inputObserver: function() {
        if (this.get("lastInput") === this.get("module.evaluation.points")) {
            return;
        }
        var points = this.get("module.evaluation.points");
        if (isFinite(points) && isFinite(this.get("lastInput"))) {
		  this.sendAction("dirty");
          var self = this;
          this.get("store").find("user", this.get("session.current_user.id")).then(function(p) {
            self.set("module.evaluation.corrected_by", p);
          });
        }
        /*if(points > 10) {
            this.set("module.evaluation.points", 10);
        }*/
        if(points < 0) {
            this.set("module.evaluation.points", 0);
        }
        this.set("lastInput", this.get("module.evaluation.points"));
	}.observes("module.evaluation.points"),
    parent_module: Ember.computed("module.module_id", function() {
        return this.get("store").find("module", this.get("module.module_id"));
    }),
    actions: {
        all: function() {
            var self = this;
            this.get('session').authorize('authorizer:oauth2', function(header, content) {
                var request = new XMLHttpRequest();
                request.open("GET", config.API_LOC + "/admin/subm/eval/" + self.get("module.evaluation.eval_id"), true);
                request.responseType = "blob";
                request.setRequestHeader(header, content);
                request.onload = function() {
                    if (this.status === 200) {
                        var file = window.URL.createObjectURL(this.response);
                        var a = document.createElement("a");
                        a.href = file;
                        a.download = this.response.name || ("oprava" + self.get("module.evaluation.eval_id") + ".zip");
                        document.body.appendChild(a);
                        a.click();
                        window.onfocus = function() {
                            document.body.removeChild(a);
                        };
                    }
                };
                request.send();
            });
        },
        log: function() {
            this.set("show_log", !this.get("show_log"));
        }
    },
});
