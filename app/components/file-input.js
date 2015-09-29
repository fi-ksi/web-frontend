import Ember from "ember";
import EmberUploader from "ember-uploader";
import InboundActions from "ember-component-inbound-actions/inbound-actions";
import config from '../config/environment';

export default EmberUploader.FileField.extend(InboundActions, {
	url: function() {
		return config["API_LOC"] + this.get("endpoint");
	}.property("endpoint"),
	classNames: ["hide"],
	attributeBindings: ["multiple", "accept"],
	filesDidChange: function(files) {
		var self = this;
		for(var i = 0; i !== files.length; i++) {
			var file = files.item(i).name;
			console.log(file);
			console.log(file.split(".").pop().toLowerCase());
		}
		var uploader = EmberUploader.Uploader.create({
			url: self.get("url")
		});

		uploader.on("didUpload", function() {
			console.log("Upload finished");
			self.sendAction("upload_finished");
		});

		uploader.on("didError", function(jqXHR, textStatus, errorThrown) {
			console.log("Upload canceled");
			self.sendAction("upload_failed", textStatus, errorThrown);
		});

		if (!Ember.isEmpty(this.get("files"))) {
			uploader.upload(this.get("files")[0]);
		}
	},
	actions: {
		
	}
});