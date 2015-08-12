import Ember from "ember";
//import cytoscape from "cytoscape";

export default Ember.Component.extend({
	didInsertElement: function() {
		if(this.get("model").get("signed_in")) {
        	Ember.$('body').toggleClass("mojetrida");
        	alert("Prihlasen!");
    	}
      	else {
      		Ember.$('body').toggleClass("mojetrida");
      		alert("Neprihlasen!");
      	}
	}
});