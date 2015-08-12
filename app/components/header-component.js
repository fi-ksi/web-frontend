import Ember from "ember";

export default Ember.Component.extend({
	didInsertElement: function() {
		if(this.get("model").get("admin")) {
      Ember.$('body').toggleClass("body-admin");
  	}
  	else {
  		Ember.$('body').toggleClass("body-user");
  	}
	}
});
