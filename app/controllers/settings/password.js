import Ember from "ember";
import config from '../../config/environment';

export default Ember.Controller.extend( {
    session: Ember.inject.service(),
    check: function() {
        if(this.get("new_password") && this.get("new_password2") &&
            this.get("new_password").length > 6 && this.get("new_password2").length > 6) {
            if(this.get("new_password") === this.get("new_password2")) {
                this.set("submit_error", undefined);
            } else {
                this.set("submit_error", "Zvolená hesla se neshodují!");
            }
        }
    }.observes("new_password", "new_password2"),
    actions: {
        change_password: function() {
            var self = this;
            self.set("submit_message", "Měním heslo");
            this.set("submit_error", undefined);
            if(this.get("new_password") !== this.get("new_password2")) {
                this.set("submit_error", "Zvolená hesla se neshodují!");
                return;
            }
            this.get('session').authorize('authorizer:oauth2', function(h, c) {
                Ember.$.ajax({
                    url: config.API_LOC + "/settings/changePassword",
                    data: JSON.stringify({
                        old_password: self.get("old_password"),
                        new_password: self.get("new_password"),
                        new_password2: self.get("new_password2")
                    }),
                    contentType: "application/json",
                    type: 'POST',
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader(h, c);
                    },
                    success: function(data){
                        if ("error" in data) {
                            self.set("submit_error", data["error"]);
                            return;
                        }
                        self.set("old_password", "");
                        self.set("new_password", "");
                        self.set("new_password2", "");
                        self.set("submit_message", "Heslo úspěšně změněno");
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        self.set("submit_message", undefined);
                        self.set("submit_error", errorThrown);
                    }
                });
            });
        }
    }
});
