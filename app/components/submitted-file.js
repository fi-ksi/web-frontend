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
                    /*headers: {
                        header: content
                    },*/
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader(header, content);
                    },
                    type: 'DELETE',
                    success: function(data) {
                        console.log(data);
                        if(data['status'] === "ok") {
                            self.send("del", self.get("file.id"));
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
                    success: function (result) {
                        var str = result.response;

                        var anchor = Ember.$('.vcard-hyperlink');
                        var windowUrl = window.URL || window.webkitURL;
                        var blob = new Blob([result.response], { type: 'text/bin' });
                        var url = windowUrl.createObjectURL(blob);
                        anchor.prop('href', url);
                        anchor.prop('download', self.get("file.filename"));
                        anchor.get(0).click();
                        windowUrl.revokeObjectURL(url);
                    },
                    error: function (jqxhr, textStatus, errorThrown) {
                      console.log(textStatus, errorThrown);
                    }
                });
            });
        }
    }
});