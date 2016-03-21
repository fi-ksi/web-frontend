import DS from "ember-data";
import Ember from "ember";

export default DS.Model.extend( {
	title: DS.attr("string"),
	time_published: DS.attr("date"),
	picture: DS.attr("string"),
	body: DS.attr("string"),
	published: DS.attr("boolean"),
	resource: DS.attr("string"),
    content: DS.belongsTo("content", { async: true }),

	published_str: Ember.computed("published", function() {
		if (this.get("published")) {
			return "ano";
		} else {
			return "ne";
		}
	}),
	intro: Ember.computed("body", function() {
		var begin = this.get("body").indexOf("<p>");
		var end = this.get("body").indexOf("</p>");
		if(begin === -1 || end === -1) {
			return "";
		}

		return this.get("body").substr(begin, end);
	})
});
