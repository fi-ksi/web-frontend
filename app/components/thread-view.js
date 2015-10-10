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
    }.observes("thread"),
    actions: {
        add_comment: function() {
            this.set("is_reacting", !this.get("is_reacting"));
            this.set("content_error", undefined);
            this.set("response_text", "");
        },
        send: function() {
            var self = this;

            if(!this.get("response_text")) {
                this.set("content_error", "Nelze odeslat prázdný příspěvek");
                return;
            }
            this.set("content_error", undefined);
            var post = this.get("store").createRecord("post", {
                body: self.get("response_text"),
                thread: self.get("thread")
            });

            post.save().then(function() {
                self.get("thread.details.root_posts").pushObject(post);
            });
        }
    },
});
