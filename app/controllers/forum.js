import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service(),

    thread_error: "",
    saving: false,
    show_error: false,

    threads: Ember.computed.sort("model", function(a, b) {
        // 0 je hack na zobrazeni noveho vlakna nahore -- nove vlakno v momente rekalkulace teto property ma id 0, protoze se id jeste nestihlo natahnout z backendu
        if ((Number(a.get("id")) < Number(b.get("id"))) || (Number(b.get("id")) === 0)) { return 1; }
        if ((Number(a.get("id")) > Number(b.get("id"))) || (Number(a.get("id")) === 0)) { return -1; }
        return 0;
    }),

    actions: {
        new_thread: function() {
            this.set("new_thread", !this.get("new_thread"));
            if(this.get("new_thread")) {
                this.set("thread_name", undefined);
                this.set("thread_content", undefined);
            }
            this.set("thread_error", "");
        },

        post_thread: function() {
            var self = this;
            this.set("thread_error", "");

            if(!this.get("thread_content")) {
                this.set("thread_error", "Obsah vlákna musí být vyplněn!");
                this.set("show_error", true);
                return;
            }

            this.set("saving", true);

            var thread = self.store.createRecord("thread", {
                title: self.get("thread_name"),
                public: true
            });

            thread.save().then(function() {
                // thread onSuccess
                var post = self.store.createRecord("post", {
                    author: self.get("session.profile.id"),
                    body: self.get("thread_content"),
                    thread: thread
                });

                post.save().then(function() {
                    // post onSuccess
                    self.set("saving", false);
                    self.set("new_thread", false);
                    self.set("thread_name", undefined);
                    self.set("thread_content", undefined);
                }, function(resp) {
                    // post onFail
                    post.destroyRecord();
                    self.set("saving", false);
                    var e = "Nepodařilo se vytvořit příspěvek! Pokud si myslíš, že chyba není na tvé straně, kontaktuj organizátora.<br>" + resp.message;
                    if (resp.errors[0]) { e += "<br>" + resp.errors[0].status  + " : " + resp.errors[0].title; }
                    self.set("thread_error", e);
                });
            }, function(resp) {
                // thread onFail
                thread.destroyRecord();
                self.set("saving", false);
                var e = "Nepodařilo se vytvořit vlákno! Pokud si myslíš, že chyba není na tvé straně, kontaktuj organizátora.<br>" + resp.message;
                if (resp.errors[0]) { e += "<br>" + resp.errors[0].status  + " : " + resp.errors[0].title; }
                self.set("thread_error", e);
                console.log(resp);
            });
        }
    },
    new_thread: false,
});
