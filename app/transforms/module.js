import DS from "ember-data";
import Ember from "ember";

export default DS.Transform.extend({
	serialize: function(value) {
		if(value) {
			return value.get("modules");
		}
		return {};
	},
	deserialize: function(value) {
		return Ember.Object.create({
			modules: value
		});
	}
});