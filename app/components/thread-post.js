import Ember from 'ember';

export default Ember.Component.extend({
    session: Ember.inject.service(),

    mark_as_read: function() {
        var post = this.get("model");
        while (post) {
            post.set("is_new", false);
            post = post.get("parent");
        }
    },

    actions: {
        react: function() {
            this.set("is_reacting", !this.get("is_reacting"));
            this.mark_as_read();
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
                parent: self.get("model"),
                thread: self.get("model.thread")
            });

            post.save().then(function() {
                self.get("model.reaction").pushObject(post);
                self.get("model").save().then(function() {
                    self.set("is_reacting", false);
                }, function() {
                    self.set("content_error", "Nepodařilo se odeslat příspěvek");
                });
            });
        },
        delete: function() {
            if (!confirm("Opravdu smazat příspěvek?")) {
                return;
            }
            this.get("model").deleteRecord();
            this.get("model").save();
        },
        edit: function() {
            this.set("content_bak", this.get("model.body"));
            this.set("is_editing", true);
            this.set("edit_error", undefined);
            this.set("edit_progress", undefined);
        },
        cancel: function() {
            this.set("model.body", this.get("content_bak"));
            this.set("is_editing", false);
        },
        save: function() {
            var self = this;
            self.set("edit_progress", "Ukládám");
            this.get("model").save().then(function() {
                    self.set("is_editing", false);
                },
                function() {
                    self.set("edit_error", "Nepodařilo se změnu příspěvku uložit");
                }
            );
        }
    },
    allow_edit: Ember.computed("session.current_user", "model.author", "model.thread.year.sealed", function() {
        return this.get("session.current_user.organisator") && this.get("model.author.id") === 
            this.get("session.current_user").id && !this.get("model.thread.year.sealed");
    }),
    allow_delete: Ember.computed("session.current_user", "model.thread.year.sealed", function() {
       return this.get("session.current_user.organisator") && !this.get("model.thread.year.sealed");
    }),
    is_reacting: false,
    content_error: undefined
});
