import Ember from "ember";
import UserSettings from "../mixins/user-settings";

export default Ember.Controller.extend(UserSettings, {
    global_error: undefined,
    global_info: undefined,
    actions: {
        upload_pic: function() {
            Ember.$("#picture_input").trigger('click');
        },
        upload_finished: function() {
            // reload image from backend
            var self = this;
            this.store.find("profile", "").then(function(profile) {
                self.set("model.profile_picture", profile.get("profile_picture"));
                var d = new Date();
                Ember.$("#profile-image").attr("src", profile.get("profile_picture_r")+"?"+d.getTime());
                alert("Obrázek změněn!");
            });
        },
        upload_failed: function(status, error) {
            alert("Nepodařilo se nahrát obrázek: " + status + " " + error);
        },
    }
});
