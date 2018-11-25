import DS from "ember-data";

export default DS.Transform.extend({
    serialize: function(value) {
        return value.map(function(item) { return item['id']; });
    },
    deserialize: function(value) {
        return value.map(function(item) { return {'id': item}; });
    }
});
