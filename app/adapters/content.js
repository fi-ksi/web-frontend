import DS from "ember-data";
import config from '../config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
    authorizer: 'authorizer:oauth2',
    host: config.API_LOC,

    pathForType: function(modelName) {
        // do not change content to contents
        return modelName;
    },

    buildURL: function(record, suffix) {
        // do not replace shashes in id to %2F
        return this._super(record,suffix).replace("%2F", "/");
    }
});
