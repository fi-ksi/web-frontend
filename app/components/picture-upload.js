import EmberUploader from "ember-uploader";
import Ember from "ember";
import InboundActions from "ember-component-inbound-actions/inbound-actions";

export default EmberUploader.FileField.extend(InboundActions, {
	url: "",
	supported_ext: ["jpg", "jpeg", "png", "gif"],
	files: undefined,
	actions: {
		make_upload: function() {
			var uploader = EmberUploader.Uploader.create({
				url: this.get("url")
			});

			uploader.on("didUpload", function() {
				this.sendAction("upload_finished");
			});

			uploader.on("didError", function(jqXHR, textStatus, errorThrown) {
				this.sendAction("upload_failed", textStatus, errorThrown);
			});

			if (!Ember.isEmpty(this.get("files"))) {
				uploader.upload(this.get("files")[0]);
			}
		}
	},
	filesDidChange: function(files) {
		this.set("files", undefined);
		for(var i = 0; i !== files.length; i++) {
			var file = files.item(i).name;
			console.log(file);
			console.log(file.split(".").pop().toLowerCase());
			if (this.get("supported_ext").indexOf(file.split(".").pop().toLowerCase()) == -1) {
				this.sendAction("file_type_error", file);
				console.log("Invalid file");
				return;
			}
		}
		this.set("files", files);
	}
});