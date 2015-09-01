import Ember from "ember";

export default Ember.Controller.extend( {
	actions: {
		sub: function(id) {
			this.transitionTo("task.submission", id);
		},
		assign: function(id) {
			this.transitionTo("task.assignment", id);
		},
		stat: function(id) {
			this.transitionTo("task.statistics", id);
		},
		discuss: function(id) {
			this.transitionTo("task.discussion", id);
		},
		solution: function(id) {
			this.transitionTo("task.solution", id);
		}
	}
});