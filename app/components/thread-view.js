import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
    session: Ember.inject.service(),
    store: Ember.inject.service(),
    mark_as_read: true, // pokud je komponente predano mark_as_read=false, nemarkue se precteni

    progress: false,
    error: "",
    error_show: false,

    thread_mark_as_read_observer: function(){
        var thread = this.get("thread");
        if(!thread || !this.get("mark_as_read")) {
            return;
        }

        this.get('session').authorize('authorizer:oauth2', function(header, content) {
            Ember.$.ajax({
                url: config.API_LOC + "/threads/" + thread.get("id"),
                data: {},
                contentType: "application/json",
                type: 'PUT',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader(header, content);
                },
            });
        });
    }.observes('thread', 'mark_as_read'),

    actions: {
        add_comment: function() {
            this.set("is_reacting", !this.get("is_reacting"));
            this.set("content_error", undefined);
            this.set("response_text", "");
        },

        send: function() {
            var self = this;
            this.set("error", "");

            if(!this.get("response_text")) {
                this.set("error", "Nelze odeslat prázdný příspěvek");
                this.set("error_show", true);
                return;
            }

            this.set("progress", true);

            var post = this.get("store").createRecord("post", {
                body: self.get("response_text"),
                thread: self.get("thread"),
                temporary: true
            });

            post.save().then(function() {
                // success
                post.set("temporary", false);
                self.get("thread.details.root_posts").pushObject(post);
                self.set("progress", false);
                self.set("is_reacting", false);

                Ember.run.later(self, function() {
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
                }, 500)
            }, function(resp) {
                // fail
                post.destroyRecord();
                self.set("progress", false);
                var e = "Nepodařilo se přidat příspěvek! Pokud si myslíš, že chyba není na tvé straně, kontaktuj organizátora.<br>" + resp.message;
                if (resp.errors[0]) { e += "<br>" + resp.errors[0].status  + " : " + resp.errors[0].title; }
                self.set("error", e)
            });
        }
    },
});
