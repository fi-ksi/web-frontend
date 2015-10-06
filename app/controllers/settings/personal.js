import Ember from "ember";
import UserSettings from "../../mixins/user-settings";
import config from '../../config/environment';

export default Ember.Controller.extend(UserSettings, {
    actions: {
        save: function() {
            var self = this;
            this.set("global_info", "Ukládám nastavení");
            this.set("global_error", undefined);

            var obj = {
                first_name: this.get("model.first_name"),
                last_name: this.get("model.last_name"),
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
                tshirt_size: this.get("model.tshirt_size")
            };

            Ember.$.ajax({
                url: config.API_LOC + "/profile",
                data: JSON.stringify(obj),
                contentType: "application/json",
                type: 'PUT',
                success: function() {
                    self.set("global_info", "Nastavení úspěšně uloženo");
                    Ember.run.later((function() {
                        self.set("global_info", undefined);
                    }), 3000);
                    // ToDo: Reload profile
                },
                error: function(j, e, error) {
                    self.set("global_info", undefined);
                    self.set("global_error", "Nepodařilo se uložit nastavení. Zkuste to za chvíli znovu. " + error);
                }
            });
        }
    }
});
