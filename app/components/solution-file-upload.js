import EmberUploader from "ember-uploader";
import Ember from "ember";
import InboundActions from "ember-component-inbound-actions/inbound-actions";

export default EmberUploader.FileField.extend(InboundActions, {
	url: "",
	multiple: true,
	attributeBindings: ["multiple", "accept"],
	actions: {
		upload: function() {
			var uploader = EmberUploader.Uploader.create({
				url: this.get("url")
			});

			uploader.on("didUpload", function() {
				console.log("Upload finished");
				this.sendAction("upload_finished");
			});

			uploader.on("didError", function(jqXHR, textStatus, errorThrown) {
				console.log("Upload canceled");
				this.sendAction("upload_failed", textStatus, errorThrown);
			});

			if (!Ember.isEmpty(this.get("files"))) {
				uploader.upload(this.get("files"));
			}
		}
	},
	filesDidChange: function(files) {
		if(!Ember.isEmpty(files)) {
			this.sendAction("valid", [].slice.call(files).map(function(i) {return i.name;}));
		} else {
			this.sendAction("invalid");
		}
	}
});