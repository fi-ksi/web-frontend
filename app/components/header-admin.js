import Ember from "ember";
import config from '../config/environment';

export default Ember.Component.extend({
    session: Ember.inject.service(),
    didInsertElement: function() {
        this._super();
        var self = this;
        
        this.get('session').authorize('authorizer:oauth2', function(header, content) {
            var request = new XMLHttpRequest();
            request.open("GET", config.API_LOC + "/admin/monitoring-dashboard", true);
            request.setRequestHeader(header, content);

            request.onload = function() {
                if (this.status === 200) {
                    Ember.$("#link-to-monitoring-dashboard").attr("href", JSON.parse(this.response)["url"]);
                } else {
                    console.warn("Nepovedlo se načíst tajný odkaz na monitorovací nástěnku.");
                }
            };
            request.send();
        });

    },
});
