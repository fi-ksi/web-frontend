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
                console.log(header);
                console.log(content);
                Ember.$.ajax({
                    url: self.get("file.filepath"),
                    data: JSON.stringify({}),
                    contentType: "application/json",
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader(header, content);
                    },
                    type: 'DELETE',
                    success: function(data) {
                        console.log(data);
                        if(data['status'] === "ok") {
                            self.sendAction("del", self.get("file.id"));
                            console.log("Delete action!");
                        }
                    },
                    error: function(j, s, a) {
                        console.log(j);
                        console.log(s);
                        console.log(a);
                        self.set("active", true);
                    }
                });
            });
        },
        down: function() {
            var self = this;
            this.get('session').authorize('authorizer:oauth2', function(header, content) {
                Ember.$.ajax({
                    url: self.get("file.filepath"),
                    type: "GET",
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader(header, content);
                    },
                    processData: false,
                    success: function (result, a, xhr) {
                        var v = new Int8Array(result.length);
                        for(var i = 0; i != result.length; i++) {
                            v[i] = result.charCodeAt(i);
                        }
                        var blob = new Blob([v], {type: xhr.getResponseHeader("content-type") || ""});
                        saveAs(blob, self.get("file.filename"));
                        //saveAs(blob, self.get("file.filename"));
                        /*var anchor = Ember.$("#sub_file" + self.get("file.id"));
                        console.log(anchor);
                        var windowUrl = window.URL || window.webkitURL;
                        var blob = new Blob([result.response], { type: 'text/bin' });
                        var url = windowUrl.createObjectURL(blob);
                        anchor.prop('href', url);
                        anchor.prop('download', self.get("file.filename"));
                        anchor.get(0).click();
                        windowUrl.revokeObjectURL(url);*/
                        /*console.log(result);
                        $("#sub_file" + self.get("file.id"))
                            .attr({
                            "href": result,
                            "download": "file.txt"
                        }).html($("#sub_file" + self.get("file.id")).attr("download"))
                            .get(0).click();*/
                    },
                    error: function (jqxhr, textStatus, errorThrown) {
                        console.log(textStatus, errorThrown);
                    }
                });
            });
        }
    }
});