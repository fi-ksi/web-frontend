import DS from "ember-data";
import Ember from "ember";

export default DS.Transform.extend({
	serialize: function(value) {
		return value.get("table");
	},
	deserialize: function(value) {
		return Ember.Object.create({
			table: value
		});
	}
});