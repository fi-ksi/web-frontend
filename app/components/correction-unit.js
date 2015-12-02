import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
    session: Ember.inject.service(),
    store: Ember.inject.service(),
    /*comment_observer: function() {
        // ToDo: Create thread
        var self = this;
        if (!this.get("model.comment.id")) {
            console.log("Creating thread!");
            var thread = self.get("store").createRecord("thread", {
                title: "OV" + this.get("model.task.id") + "_" + this.get("model.user.id"),
                public: false          
            });
            thread.save().then(function() {
                console.log("saved!");
                self.set("model.comment", thread);
                return self.get("model").save();
            })
            .then(function() {
                console.log("saving post");
                var post = self.get("store").createRecord("post", {
                    author: self.get("session.profile.id"),
                    body: "Ahoj",
                    thread: self.get("model.comment")
                });
                return post.save();
            })
            .then(function(post) {
                console.log("Prispevek pridan!\n");
                self.get("model.comment.details.root_posts").pushObject(post);
            });
        }

    }.observes("model.comment.id"),*/
    actions: {
        
    },
});
