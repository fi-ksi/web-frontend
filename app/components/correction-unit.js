import Ember from 'ember';

export default Ember.Component.extend({
    session: Ember.inject.service(),
    store: Ember.inject.service(),
    ident: Ember.computed("model", function() {
       return this.get("model.task_id").id + "_" + this.get("model.user.id");
    }),

    save: function() {
        var self = this;
        this.set("statemsg", "Ukládám");
        this.get("model").save().then(
            function() {
                self.set("statemsg", "Uloženo");
            },
            function() {
                self.set("statemsg", "Chyba! při ukládání. Zkus znovu");
            }
        );
    },

    statemsg: "Uloženo",
    actions: {
        add_achievement: function() {
            var self = this;
            var selected = Ember.$("#a_" + this.get("ident")).val();
            if (selected !== ""){
                this.get("store").find("achievement", selected).then(function(ach) {
                    self.get("model.achievements").pushObject(ach);
                    self.send("save");
                });
            }
        },
        ach_del: function(selected) {
            var self = this;
            this.get("store").find("achievement", selected).then(function(ach) {
                self.get("model.achievements").removeObject(ach);
                self.send("save");
            });
        },
        dirty: function() {
            this.set("statemsg", "Neuloženo");
        },
        save: function() {
            this.save();
        },
        new_thread: function() {
            this.set("new_thread", !this.get("new_thread"));
            if(this.get("new_thread")) {
                this.set("thread_name", undefined);
                this.set("thread_content", undefined);
            }
            this.set("thread_name_error", undefined);
            this.set("thread_content_error", undefined);
        },
        post_thread: function() {
            var self = this;
            this.set("thread_name_error", undefined);
            this.set("thread_content_error", undefined);

            this.set("thread_name", "User" + this.get("model.user.id") + "|Task" + this.get("model.task_id.id"));
            if(!this.get("thread_content")) {
                this.set("thread_content_error", "Obsah komentáře musí být vyplněn!");
            }

            if(this.get("thread_name_error") || this.get("thread_content_error")) {
                return;
            }


            var thread = self.get("store").createRecord("thread", {
                title: self.get("thread_name"),
                private: true
            });

            thread.save().then(function() {
                var post = self.get("store").createRecord("post", {
                    author: self.get("session.profile.id"),
                    body: self.get("thread_content"),
                    thread: thread,
                    private: true
                });

                post.save().then(function() {
                    self.set("model.comment", thread);
                    self.save();
                });
            }).then(function() {
                self.set("new_thread", false);
                self.set("info", "Vlákno úspěšně založeno");

                self.set("thread_name", undefined);
                self.set("thread_content", undefined);
                Ember.run.later(this, (function() {
                    self.set("info", undefined);
                }), 5000);
            });
        }
    },
});
