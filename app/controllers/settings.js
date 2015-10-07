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
    		this.get("model").reload();
            alert("Obrázek změnen!");
    	},
    	upload_failed: function(status, error) {
    		alert("Nepodařilo se nahrát obrázek: " + status + " " + error);
    	},
    	save: function() {
    		var self = this;
    		this.set("global_info", "Ukládám nastavení");
    		this.set("global_error", undefined);
    		this.get("model").save().then(function() {
    			this.set("global_info", "Nastavení úspěšně uloženo");
    			Ember.run.later((function() {
    				self.set("global_info", undefined);
    			}), 3000);
    		},
    		function() {
    			this.set("global_info", undefined);
    			this.set("global_error", "Nepodařilo se uložit nastavení. Zkuste to za chvíli znovu");
    		});
    	}
    }
});
