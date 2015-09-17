import Ember from "ember";

export default Ember.Controller.extend( {
    countries: ["Česká republika", "Slovensko"],
    tshirt_size: ["S", "M", "L", "XL"],
    maturita_year: ["2016", "2017", "2018", "2019"],
    is_changing_picture: false,
    picture_error: undefined,
    actions: {
    	upload_pic: function() {
    		if(this.get("is_changing_picture")) {
    			this.get("picture_field").sendAction("make_upload");
    			this.set("is_changing_picture", false);
    		}
    		else {
    			this.set("is_changing_picture", true);
    			this.set("picture_error", undefined);
    		}
    	},
    	file_type_error: function(filename) {
    		console.log("Invalid file captured");
    		this.set("picture_error", "Nepodporovaný typ souboru: " + filename);
    	}
    }
});
