import Ember from "ember";

export default Ember.Controller.extend( {
    countries: ["Česká republika", "Slovensko"],
    tshirt_size: ["S", "M", "L", "XL"],
    maturita_year: ["2016", "2017", "2018", "2019"],
    global_error: undefined,
    global_info: undefined,
    actions: {
    	upload_pic: function() {
    		Ember.$("#picture_input").trigger('click');
    	},
    	upload_finished: function() {
    		// ToDo: Reload picture!
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
