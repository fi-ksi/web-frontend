import Ember from "ember";
import UserSettings from "../mixins/user-settings";

export default Ember.Controller.extend(UserSettings, {
    country: Ember.computed("model.addr_country", function() {
        var self = this;
        var arr = this.get("countries").filter(function(e) {
            return e.short === self.get("model.addr_country");   
        });
        arr.push({ name: "" });
        return arr[0].name;
    }),
    participant: Ember.computed("model.gender", function() {
        if(this.get("model.gender") === "male") {
            return "řešitel";
        } else if (this.get("model.gender") === "female") {
            return "řešitelka";
        }
        return null;
    }),
    organisator: Ember.computed("model.gender", function() {
        if(this.get("model.gender") === "male") {
            return "organizátor";
        } else if (this.get("model.gender") === "female") {
            return "organizátorka";
        }
        return null;
    }),
    tasks: Ember.computed("model.gender", function() {
        if(this.get("model.gender") === "male") {
            return "Organizátorovy úlohy";
        } else if (this.get("model.gender") === "female") {
            return "Organizátorčiny úlohy";
        }
        return null;
    }),
    admin: Ember.computed("model.gender", function() {
        if(this.get("model.gender") === "male") {
            return "administrátor";
        } else if (this.get("model.gender") === "female") {
            return "administrátorka";
        }
        return null;
    })
});
