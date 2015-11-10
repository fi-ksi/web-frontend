import Ember from "ember";

export default Ember.Component.extend({
    session: Ember.inject.service(),
    tagName: "",
    classNames: [],
    didInsertElement: function() {
        this._super();
        this.set("active", true);
        Ember.run.scheduleOnce("afterRender", this, function(){
            
        }); 
    },
    actions: {
        del: function() {
            if (!this.get("active")) {
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
                    error: function(j, s, a) {
                        self.set("active", true);
                    }
                });
            });
        },
        down: function() {
            var self = this;
            this.get('session').authorize('authorizer:oauth2', function(header, content) {
                /*Ember.$.ajax({
                    url: self.get("file.filepath"),
                    type: "GET",
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader(header, content);
                    },
                    processData: false,
                    success: function (result, a, xhr) {
                        var blob = new Blob([result], {type: xhr.getResponseHeader("content-type") || ""});
                        saveAs(blob, self.get("file.filename"));
                    },
                    error: function (jqxhr, textStatus, errorThrown) {
                        console.log(textStatus, errorThrown);
                    }
                });*/
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