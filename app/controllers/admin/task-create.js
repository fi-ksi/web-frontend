import Ember from "ember";

export default Ember.Controller.extend( {
	store: Ember.inject.service(),
	session: Ember.inject.service(),
	git_create: true,
	organisators: Ember.computed("model", function() {
		return this.get("model").users.filter(function(user){
			return user.get("organisator");
		});
	}),
	actions: {
		'task-save': function() {
			var self = this;

			this.get("store").createRecord('atask', {
				title: this.get("title"),
				wave: this.get("model").wave,
				author: this.get("author"),
				git_create: this.get("git_create"),
				git_branch: this.get("git_branch"),
				git_path: this.get("git_path"),
				git_commit: this.get("git_commit")
			}).save().then(function() {
				self.transitionToRoute('admin/atasks');
			}, function () {
				self.set("error_status", "Špatná odpověď ze serveru! Zkus to za chvíli znovu. Pokud problém přetrvává, kontaktuj organizátora.");
			});
		}
	},

	title_changed: function(){
		var newTaskId = ("00" + (this.get("model.tasks.length")+1)).substr(-2,2);

		var accentedCharacters = "úuůuýyáačcďdéeěeíiňnóořršsťtľlšs";
		var slug = this.get("title").toLowerCase()
			.replace(/[^A-Za-z0-9 ]/g, function(a){
				var i = accentedCharacters.indexOf(a);
				if(i >= 0) {
					return accentedCharacters.charAt(i + 1);
				}
				return '';
			})
			.replace(/ +/g,'_');

		var wave = this.get("model").wave;
		var year = wave.get("year").get("year").match(/[0-9]+/g)[0];
		var waveIndex = wave.get("index");
		var waveZeros = ("00" + waveIndex).substr(-2,2);

		this.set("git_path", year+"/vlna"+waveIndex+"/uloha_"+newTaskId+"_"+slug);
		this.set("git_branch", year+"_"+waveZeros+"_"+newTaskId+"_"+slug);

	}.observes('title')
});
