import DS from "ember-data";
import Ember from "ember";

export default DS.Transform.extend({
	serialize: function(value) {
		return [ value.get("x"), value.get("y") ];
	},
	deserialize: function(value) {
		return Ember.Object.create({x: value[0], y: value[1]});
	}
});