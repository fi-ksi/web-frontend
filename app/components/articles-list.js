import Ember from "ember";

export default Ember.Component.extend({
	limit: 5,
	getData: function() {
		if(this.get("model") == undefined) {
			this.set("model", this.get("store").query("article", {
				_start: 0,
				_limit: this.get("limit")
			}));
		}
	}.on("init")
});