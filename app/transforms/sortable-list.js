import DS from "ember-data";
import Ember from "ember";

export default DS.Transform.extend({
	serialize: function(value) {
		return {
			fixed: value.get("fixed"),
			movable: value.get("movable")
		};
	},
	deserialize: function(value) {
		return Ember.Object.create(value);
	}
});