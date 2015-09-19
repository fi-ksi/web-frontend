import EmberUploader from "ember-uploader";
import Ember from "ember";
import InboundActions from "ember-component-inbound-actions/inbound-actions";

export default EmberUploader.FileField.extend(InboundActions, {
	url: "",
	supported_ext: ["jpg", "jpeg", "png", "gif"],
	classNames: ["hide"],
	attributeBindings: ["multiple", "accept"],
	accept: function() {
		return this.get("supported_ext").map(function(i) { return "." + i; }).toString();
	}.property("supported_ext"),
	filesDidChange: function(files) {
		for(var i = 0; i !== files.length; i++) {
			var file = files.item(i).name;
			console.log(file);
			console.log(file.split(".").pop().toLowerCase());
			if (this.get("supported_ext").indexOf(file.split(".").pop().toLowerCase()) === -1) {
				alert("Nepodporovaný typ souboru: " + file);
				return;
			}
		}
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
			uploader.upload(this.get("files")[0]);
		}
	}
});