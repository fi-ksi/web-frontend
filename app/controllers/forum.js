import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
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

        	if(!this.get("thread_name")) {
        		this.set("thread_name_error", "Název vlákna musí být vyplněn!");
        	}
        	if(!this.get("thread_content")) {
        		this.set("thread_content_error", "Obsah vlákna musí být vyplněn!");
        	}
        	
        	if(this.get("thread_name_error") || this.get("thread_content_error")) {
        		return;
        	}

            var post = this.store.createRecord("post", {
                author: this.get("session.profile.id"),
                body: this.get("thread_content")
            }); 

            post.save().then(function() {
                var thread = self.store.createRecord("thread", {
                    title: self.get("thread_name"),
                    root_posts: [
                        post
                    ]                
                });
                thread.save().then(function() {
                    // ToDo: Error handling
                	self.set("new_thread", false);
                	self.set("info", "Vlákno úspěšně založeno");

                	self.set("thread_name", undefined);
                	self.set("thread_content", undefined);

                	Ember.run.later((function() {
        				self.set("info", undefined);
        			}), 5000);
                });
            });
        }
    },
    new_thread: false,
});
