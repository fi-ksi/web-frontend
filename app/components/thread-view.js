import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
    thread_mark_as_read_observer: function() {
        var thread = this.get("thread");
        if(!thread) {
            return;
        }

        Ember.$.ajax({
            url: config.API_LOC + "/threads/" + thread.get("id"),
            data: {},
            contentType: "application/json",
            type: 'PUT',
        });
    }.observes("thread")
});
