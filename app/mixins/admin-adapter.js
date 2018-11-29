import DS from "ember-data";
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import config from '../config/environment';
import Ember from "ember";

export default DS.RESTAdapter.extend(DataAdapterMixin, {
    authorizer: 'authorizer:oauth2',
    namespace: 'admin',
    host: config.API_LOC,

    headers: Ember.computed('session.year', function() {
        var year = this.get('session.year');
        if (year) {
            return { 'year': year };
        } else {
            return {};
        }
    })

});
