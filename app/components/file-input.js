import Ember from "ember";
import EmberUploader from "ember-uploader";
import InboundActions from "ember-component-inbound-actions/inbound-actions";
import config from '../config/environment';

export default EmberUploader.FileField.extend(InboundActions, {
	url: Ember.computed("endpoint", function() {
		return config["API_LOC"] + this.get("endpoint");
	}),
	classNames: ["hide"],
	attributeBindings: ["multiple", "accept"],
	filesDidChange: function(files) {
		var res = [];
		for(var i = 0; i !== files.length; i++) {
			var file = files.item(i).name;
			res.push(file);
		}
		this.sendAction("file_list", res);
	},
	actions: {
		upload: function() {
			var self = this;
			var uploader = EmberUploader.Uploader.create({
				url: self.get("url")
			});

			uploader.on("didUpload", function() {
				self.sendAction("upload_finished");
			});

			uploader.on("didError", function(jqXHR, textStatus, errorThrown) {
				console.log("Upload canceled");
				self.sendAction("upload_failed", textStatus, errorThrown);
			});

			if (!Ember.isEmpty(this.get("files"))) {
				uploader.upload(this.get("files"));
			}
		},

	}
});