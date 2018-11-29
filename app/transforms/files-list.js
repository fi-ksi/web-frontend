import DS from "ember-data";
import Ember from "ember";
import config from '../config/environment';

export default DS.Transform.extend({
    serialize: function(value) {
        if(value) {
            return value.get("files");
        }
    },
    deserialize: function(value) {
        /*return Ember.Object.create( {
            id: value['id'],
            filename: value['filename'],
            filepath: config.API_LOC + value['filename']
        });*/
        return Ember.Object.create( {
            files: value.map(function(x) {
                x['filepath'] = config.API_LOC + '/submFiles/' + x['id'];
                return x;
            })
        });
    }
});
