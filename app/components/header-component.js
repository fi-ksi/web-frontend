import Ember from "ember";
import config from '../config/environment';

export default Ember.Component.extend({
    session: Ember.inject.service(),
    didInsertElement: function() {
        this._super();
        this.set("error_message", undefined);
    },

    actions: {
        logout: function() {
            var self = this;
            this.get('session').authorize('authorizer:oauth2', function(header, content) {
                Ember.$.ajax({
                    url: config.API_LOC + "/logout",
                    data: {},
                    contentType: "application/json",
                    type: 'GET',
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader(header, content);
                    },
                    success: function() {
                        self.get("session").invalidate();
                    },
                    error: function() {
                        self.get("session").invalidate();
                    }
                });
            });
        },

        changeYear: function(newyear) {
            this.get('session').changeYear(newyear);
            this._controller.send("reload");
        },
    },
});
