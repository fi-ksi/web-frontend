import Ember from "ember";
import EmberUploader from "ember-uploader";
import InboundActions from "ember-component-inbound-actions/inbound-actions";
import config from '../config/environment';

EmberUploader.Uploader.reopen({
    session: Ember.inject.service(),
    ajax: function(url, param, method) {
        var self = this;
        var tmp = this.ajaxSettings(url, param, method);
        tmp['beforeSend'] = function(xhr) {
            xhr.setRequestHeader(self.get('header'), self.get('content'));
        };
        return this._ajax(tmp);
    }
});

export default EmberUploader.FileField.extend(InboundActions, {
    session: Ember.inject.service(),
    url: Ember.computed("endpoint", function() {
        return config["API_LOC"] + this.get("endpoint");
    }),
    classNames: ["hide"],
    attributeBindings: ["multiple", "accept"],
    limit: 20971520,
    filesDidChange: function(files) {
        var self = this;
        var res = [];
        var size = 0;
        for(var i = 0; i !== files.length; i++) {
            var file = files.item(i).name;
            res.push(file);
            size += files[i].size;
        }

        this.set("size", size);
        if(this.get("size") > this.get("limit")) {
            this.sendAction("upload_failed", "Nelze nahrát soubory větší než 20 MB", "");
        }

        this.sendAction("file_list", res);
        this.get('session').authorize('authorizer:oauth2', function(header, content) {
            self.set('header', header);
            self.set('content', content);
        });
    },
    actions: {
        upload: function() {
            if(this.get("size") > this.get("limit")) {
                this.sendAction("upload_failed", "Nelze nahrát soubory větší než 20 MB", "");
            }
            var self = this;
            this.get('session').authorize('authorizer:oauth2', function(h, c) {
                var uploader  = EmberUploader.Uploader.create({
                    url: self.get("url"),
                    header: h,
                    content: c
                });

                uploader.on("didUpload", function() {
                    self.sendAction("upload_finished");
                });

                uploader.on("didError", function(jqXHR, textStatus, errorThrown) {
                    //self.sendAction("upload_failed", JSON.parse(jqXHR.responseText)["error"], errorThrown);
                    self.sendAction("upload_failed", "Nepodařilo se nahrát soubory - chyba spojení nebo příliš velké soubory", errorThrown);
                });
                
                uploader.on("progress", function(e) {
                    self.sendAction("progress", e.percent);
                });

                if (!Ember.isEmpty(self.get("files"))) {
                    uploader.upload(self.get("files"));
                }
            });
        },

    }
});
