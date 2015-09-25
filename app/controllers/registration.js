import Ember from "ember";
import config from '../config/environment';

export default Ember.Controller.extend( {
    countries: ["Česká republika", "Slovensko"],
    tshirt_size: ["S", "M", "L", "XL"],
    maturita_year: ["2016", "2017", "2018", "2019"],
    registration_done: false,
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
    actions: {
    	register: function() {
            var self = this;
            this.set("general_error", undefined);

            if(this.get("model.password") !== this.get("model.password2")) {
                this.set("password_error", true);

                var elems = Ember.$(".alert-danger");
                var offset = Math.min.apply(null, Ember.$.map(elems, function(elem) { return Ember.$(elem).offset().top; }));
                Ember.$('html, body').animate({
                    scrollTop: offset - 150 //Magic constant
                }, "slow");
                return;
            }

            
            Ember.$.ajax({
                url: config.API_LOC + "/registration",
                data: JSON.stringify(self.get("model")),
                contentType: "application/json",
                type: 'POST',
                success: function() {
                    self.set("registration_done", true);
                },
                error: function(j, e, error) {
                    self.set("general_error", error);
                }
            });
        }
    }
});
