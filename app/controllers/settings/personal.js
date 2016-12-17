import Ember from "ember";
import UserSettings from "../../mixins/user-settings";
import config from '../../config/environment';

export default Ember.Controller.extend(UserSettings, {
    session: Ember.inject.service(),

    actions: {
        onInfoClose: function() {
            console.log("here!");
            this.set("general_close_info", undefined);
        },

        onErrorClose: function() {
            console.log("here!");
            this.set("general_close_info", undefined);
        },

        save: function() {
            var self = this;
            this.set("general_close_info", "Ukládám nastavení...");
            this.set("general_error", undefined);

            var obj = {
                first_name: this.get("model.first_name"),
                last_name: this.get("model.last_name"),
                nick_name: this.get("model.nick_name"),
                email: this.get("model.email"),
                gender: this.get("model.gender"),
                addr_street: this.get("model.addr_street"),
                addr_city: this.get("model.addr_city"),
                addr_zip: this.get("model.addr_zip"),
                addr_country: this.get("model.addr_country"),
                school_name: this.get("model.school_name"),
                school_street: this.get("model.school_street"),
                school_city: this.get("model.school_city"),
                school_zip: this.get("model.school_zip"),
                school_country: this.get("model.school_country"),
                school_finish: this.get("model.school_finish"),
                short_info: this.get("model.short_info"),
                tshirt_size: this.get("model.tshirt_size"),
                notify_eval: this.get("model.notify_eval"),
                notify_response: this.get("model.notify_response")
            };

            this.get('session').authorize('authorizer:oauth2', function(header, content) {
                Ember.$.ajax({
                    url: config.API_LOC + "/profile",
                    data: JSON.stringify(obj),
                    contentType: "application/json",
                    type: 'PUT',
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader(header, content);
                    },
                    success: function() {
                        self.set("general_close_info", "Nastavení úspěšně uloženo");
                        self.get("session").setCurrentUser();
                    },
                    error: function(j, e, error) {
                        self.set("general_error", "Nepodařilo se uložit nastavení. Zkuste to za chvíli znovu. " + error);
                    }
                });
            });
        }
    }
});
