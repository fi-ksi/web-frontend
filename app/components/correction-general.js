import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
    session: Ember.inject.service(),
    store: Ember.inject.service(),

    actions: {
        all: function() {
            var self = this;
            this.get('session').authorize('authorizer:oauth2', function(header, content) {
                var request = new XMLHttpRequest();
                request.open("GET", config.API_LOC + "/admin/subm/eval/" + self.get("evaluation.eval_id"), true);
                request.responseType = "blob";
                request.setRequestHeader(header, content);
                request.onload = function() {
                    if (this.status === 200) {
                        var file = window.URL.createObjectURL(this.response);
                        var a = document.createElement("a");
                        a.href = file;
                        a.download = this.response.name || ("oprava" + self.get("evaluation.eval_id") + ".zip");
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
    },
});
