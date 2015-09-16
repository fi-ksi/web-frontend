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

            var thread = this.store.createRecord("thread", {
                title: this.get("thread_name"),
                root_posts: [
                    this.store.createRecord("post", {
                        author: this.get("session.profile.id"),
                        body: this.get("thread_content")
                    })
                ]                
            });

            var post = this.store.createRecord("post", {
                author: this.get("session.profile.id"),
                body: this.get("thread_content")
            });

            thread.save().then(function() {
                //post.save();
            });
        	// Insert thread
        	/*this.store.push("thread", {
        		title: this.get("thread_name"),
        		root_posts: [
        			{
        				author: this.get("session.profile.if"),
        				body: this.get("thread_content"),
        			}
        		]
        	});*/

        	this.set("new_thread", false);
        	this.set("info", "Vlákno úspěšně založeno");

        	this.set("thread_name", undefined);
        	this.set("thread_content", undefined);

        	var self = this;
        	Ember.run.later((function() {
				self.set("info", undefined);
			}), 5000);
        }
    },
    new_thread: false,
});
