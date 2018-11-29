import Ember from "ember";

export default Ember.Controller.extend({
    session: Ember.inject.service(),

    mark_post_as_read: function(post) {
        var self = this;
        post.set("is_new", false);
        var reactions = post.get("reaction");
        reactions.forEach(function(post){
            self.mark_post_as_read(post);
        });
    },

    mark_thread_as_read: function() {
        var self = this;
        var root = this.get("model.details.root_posts");
        root.forEach(function(post){
            self.mark_post_as_read(post);
        });
    },

});
