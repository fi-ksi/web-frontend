import Ember from "ember";

export default Ember.Controller.extend( {
    countries: ["Česká republika", "Slovensko"],
    tshirt_size: ["S", "M", "L", "XL"],
    maturita_year: ["2016", "2017", "2018", "2019"],
    registration_done: false,
    actions: {
    	register: function() {
            this.get("model").save().then(function() {
                this.set("registration_done", true);
                // ToDo
            },
            function() {
                alert("Saving failed!");
                // ToDo
            }
        }
    }
});
