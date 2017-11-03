import Ember from 'ember';

export default Ember.Component.extend({
    session: Ember.inject.service(),
    depth: 0,   // hloubka vlakna v diskuzi
    max_depth: 3,   // nejvetsi hloubka, ve ktere jeste zanorovat

    edit_progress: false,
    edit_error: "",
    react_progress: false,
    react_error: "",
    react_error_show: false,

    depth_inc: Ember.computed("depth", function(){
        return this.get("depth") + 1;
    }),

    // jestli byl presahnut limit zanorovani
    depth_exceeded: Ember.computed("depth", "max_depth", function(){
        return this.get("depth") >= this.get("max_depth");
    }),

    mark_as_read: function() {
        var post = this.get("model");
        while (post) {
            post.set("is_new", false);
            post = post.get("parent");
        }
    },

    actions: {
        openUsersSubmission: function() {
            var url = Ember.$(this.element).find("a.toSubmissions").last()[0].href;
            if (url != undefined){
                window.open(url, '_blank');
            }
        },
        react: function() {
            this.set("is_reacting", !this.get("is_reacting"));
            this.mark_as_read();
            this.set("content_error", undefined);
            this.set("response_text", "");
        },
        send: function() {
            var self = this;
            this.set("react_error", "");

            if(!this.get("response_text")) {
                this.set("react_error", "Nelze odeslat prázdný příspěvek");
                this.set("react_error_show", true);
                return;
            }

            this.set("react_progress", true);

            var post = this.get("store").createRecord("post", {
                body: self.get("response_text"),
                parent: self.get("model"),
                thread: self.get("model.thread"),
                temporary: true
            });

            post.save().then(function() {
                post.set("temporary", false);
                self.set("react_progress", false);
                self.set("is_reacting", false);
                self.set("response_text", "");
                Ember.run.later(self, function() {
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
                }, 500);
            }, function(resp) {
                // fail
                post.destroyRecord();
                self.set("react_progress", false);
                var e = "Nepodařilo se uložit příspěvek! Pokud si myslíš, že chyba není na tvé straně, kontaktuj organizátora.<br>" + resp.message;
                if (resp.errors[0]) { e += "<br>" + resp.errors[0].status  + " : " + resp.errors[0].title; }
                self.set("react_error", e);
            });
        },
        delete: function() {
            if (!confirm("Opravdu smazat příspěvek a všechny reakce na něj?")) {
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
            Ember.run.later(this, function() {
                MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
            }, 500);
        },
        save: function() {
            var self = this;
            this.set("edit_progress", true);
            this.set("edit_error", "");

            this.get("model").save().then(function() {
                    self.set("is_editing", false);
                    self.set("edit_progress", false);
                    Ember.run.later(self, function() {
                        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
                    }, 500);
                },
                function(resp) {
                    self.set("edit_progress", false);
                    var e = "Nepodařilo se uložit příspěvek! Pokud si myslíš, že chyba není na tvé straně, kontaktuj organizátora.<br>" + resp.message;
                    if (resp.errors[0]) { e += "<br>" + resp.errors[0].status  + " : " + resp.errors[0].title; }
                    self.set("edit_error", e);
                }
            );
        }
    },
    allow_edit: Ember.computed("session.current_user", "model.thread.year.sealed", function() {
        return this.get("session.current_user.organisator") && !this.get("model.thread.year.sealed");
    }),
    isOrg: Ember.computed("session.current_user", function() {
        return this.get("session.current_user.organisator");
    }),
    allow_delete: Ember.computed("session.current_user", "model.thread.year.sealed", function() {
       return this.get("session.current_user.organisator") && !this.get("model.thread.year.sealed");
    }),
    is_reacting: false,
    content_error: undefined
});
