import DS from "ember-data";
import Ember from "ember";
import config from '../config/environment';

export default DS.Transform.extend({
    serialize: function(value) {
        return { id: value.get("id"), filename: value.get("filename") };
    },
    deserialize: function(value) {
        return Ember.Object.create( {
            id: value['id'],
            filename: value['filename'],
            filepath: config.API_LOC + value['filename']
        });
    }
});
