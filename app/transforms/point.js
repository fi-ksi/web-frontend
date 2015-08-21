import DS from "ember-data";

export default DS.Transform.extend({
	serialize: function(value) {
		return [ value.get("x"), value.get("y") ];
	},
	deserialize: function(value) {
		return Ember.create({x: value[0], y: value[1]});
	}
})