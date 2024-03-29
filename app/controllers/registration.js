import Ember from "ember";
import UserSettings from "../mixins/user-settings";
import config from '../config/environment';

export default Ember.Controller.extend(UserSettings, {
    registration_done: false,
    registration_in_progress: false,
    privacyPolicyAccepted: false,
    check: function() {
        if(this.get("model.password") && this.get("model.password2") &&
            this.get("model.password").length > 6 && this.get("model.password2").length > 6) {
            if(this.get("model.password") === this.get("model.password2")) {
                this.set("password_error", undefined);
            } else {
                this.set("password_error", true);
            }
        }
    }.observes("model.password", "model.password2"),
    getReferralString: function(){
        var referralString = "{";
        var checkboxes = document.getElementsByClassName("referralCheckboxes");
        var customBox = document.getElementById("referral-other");
    
        for (const singleCheckbox of checkboxes){
            console.log();
            referralString += `"${singleCheckbox.id}":${singleCheckbox.checked},`
        }
        try {
            referralString += `"${customBox.id}": "${btoa(encodeURIComponent(customBox.value))}"`;
        } catch(error){
            referralString += `"${customBox.id}": "${btoa("JS ERROR: " + error.toString())}"`;
        }
        referralString += "}"
        return referralString;
    },
    actions: {
        register: function() {
            var self = this;
            this.set("general_error", undefined);
            this.set("taken", false);
            this.set("privacyPolicyError", undefined);

            
            if (this.get("privacyPolicyAccepted") !== true){
                this.set("privacyPolicyError", true);
                return;
            }

            if(this.get("model.password") !== this.get("model.password2")) {
                this.set("password_error", true);

                var elems = Ember.$(".alert-danger");
                var offset = Math.min.apply(null, Ember.$.map(elems, function(elem) { return Ember.$(elem).offset().top; }));
                Ember.$('html, body').animate({
                    scrollTop: offset - 150 //Magic constant
                }, "slow");
                return;
            }

            if(!this.get("model.short_info")) {
                this.set("model.short_info", "");
            }

            this.set("model.referral", this.getReferralString());

            this.set("registration_in_progress", true);
            Ember.$.ajax({
                url: config.API_LOC + "/registration",
                data: JSON.stringify(self.get("model")),
                contentType: "application/json",
                type: 'POST',
                success: function(data) {
                    self.set("registration_in_progress", false);
                    if (data && "error" in data) {
                        if (data.error === "duplicate_user") {
                            self.set("taken", true);
                        } else {
                            self.set("general_error", "Chyba při registraci! " + data.error);
                        }
                        var elems = Ember.$(".alert-danger");
                        var offset = Math.min.apply(null, Ember.$.map(elems, function(elem) { return Ember.$(elem).offset().top; }));
                        Ember.$('html, body').animate({
                            scrollTop: offset - 150 //Magic constant
                        }, "slow");
                    } else {
                        self.set("registration_done", true);
                    }
                },
                error: function() {
                    self.set("registration_in_progress", false);
                    self.set("general_error", "Špatná odpověď ze serveru. Zkus to znovu za chvíli.");
                }
            });
        },
        close_gdpr: function() {
            Ember.$('#gdpr-modal').modal('hide');
        }
    }
});
