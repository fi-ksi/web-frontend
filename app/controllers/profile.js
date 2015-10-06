import Ember from "ember";
import UserSettings from "../mixins/user-settings";

export default Ember.Controller.extend(UserSettings, {
    country: Ember.computed("model.addr_country", function() {
        return this.get("countries").filter(function(e) {
            return e.short === this.get("model.addr_country")   
        }).append({ name: "" })[0].name;
    })
});
