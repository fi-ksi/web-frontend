import DS from "ember-data";
import Ember from "ember";

export default DS.Transform.extend({
	serialize: function(value) {
		if(value) {
			return {
				fixed: value.get("fixed"),
				movable: value.get("movable")
			};
		}
		return {};
	},
	deserialize: function(value) {
		return Ember.Object.create(value);
	}
});