import Ember from "ember";
import config from '../config/environment';

export default Ember.Component.extend({
    session: Ember.inject.service(),
    tagName: "",
    classNames: [],
    didInsertElement: function() {
        this._super();
        this.set("active", true);
    },
    actions: {
        del: function() {
            if (!this.get("active")) {
                return;
            }

            if (!confirm("Opravdu odstranit soubor " + this.get("file.filename") + "?")) {
                return;
            }

            this.set("active", false);
            var self = this;
            this.get('session').authorize('authorizer:oauth2', function(header, content) {
                Ember.$.ajax({
                    url: self.get("file.filepath"),
                    data: JSON.stringify({}),
                    contentType: "application/json",
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader(header, content);
                    },
                    type: 'DELETE',
                    success: function(data) {
                        if(data['status'] === "ok") {
                            self.sendAction("del", self.get("file.id"));
                        }
                    },
                    error: function() {
                        self.set("active", true);
                    }
                });
            });
        },
        down: function() {
            var self = this;
            this.get('session').authorize('authorizer:oauth2', function(header, content) {
                if(!self.get("file.filepath")) {
                    self.set("file.filepath", config.API_LOC + '/submFiles/' + self.get("file").id);
                }
                var request = new XMLHttpRequest();
                request.open("GET", self.get("file.filepath"), true);
                request.responseType = "blob";
                request.setRequestHeader(header, content);
                request.onload = function() {
                    if (this.status === 200) {
                        var file = window.URL.createObjectURL(this.response);
                        var a = document.createElement("a");
                        a.href = file;
                        a.download = this.response.name || self.get("file.filename");
                        document.body.appendChild(a);
                        a.click();
                        window.onfocus = function() {
                            document.body.removeChild(a);
                        };
                    }
                };
                request.send();
            });
        }
    }
});
