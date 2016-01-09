import Ember from "ember";
import config from '../../config/environment';

export default Ember.Controller.extend( {
	git_create: true,
	send_status: "",
	error_status: "",
    waves: Ember.computed("store", function() {
    	return this.get("store").findAll("wave");
	}),
    organisators: Ember.computed("store", function() {
		return this.get("store").findAll("user");
    }),
	actions: {
		'task-save': function(task) {
			var self = this;

			self.get('session').authorize('authorizer:oauth2', function(header, h) {

				Ember.$.ajax({
                    url: config.API_LOC + "/admin/atask/"+task.id+"?git_create="+self.get("git_create"),
                    data: JSON.stringify({
                        "task": {
	                        "wave": task.wave,
	                        "title": task.title,
	                        "author": task.author,
	                        "git_path": task.git_path,
	                        "git_branch": task.git_branch,
	                        "git_commit": task.git_commit
	                	}
                    }),
                    contentType: "application/json",
                    type: 'POST',
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader(header, h);
                        self.set("send_status", "Odesílám zprávu");
                    },
                    success: function() {
                        this.get("model").reload();
                        self.transitionTo('admin.tasks');
                    },
                    error: function() {
                        self.set("error_status", "Špatná odpověď ze serveru! Zkus to za chvíli znovu. Pokud problém přetrvává, kontaktuj organizátora.");
                    }
                });
			});
		}
	},
	title_changed: function(){
		var task = this.get("model");

		if(task.wave) {
			var newTaskId = this.get("store").all('atask').filter(function(element){
				return element.wave === task.wave;
			}).length;
			newTaskId = ("00" + newTaskId).substr(-2,2);

			var slug = task.get("title").toLowerCase()
	        	.replace(/[^\w ]+/g,'')
	       		.replace(/ +/g,'-');

	       	console.log(task.wave);

			if(!task.get("git_path")) {
				task.set("git_path", task.wave.year+"/vlna"+task.wave.index+"/"+newTaskId+"_"+slug.toString());
			}
		}
	}.observes('model.title')
});