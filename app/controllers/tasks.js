import Ember from "ember";

export default Ember.Controller.extend( {
    session: Ember.inject.service(),
    actions: {
        sub: function(id) {
            this.transitionToRoute("task.submission", id);
        },
        assign: function(id) {
            this.transitionToRoute("task.assignment", id);
        },
        stat: function(id) {
            this.transitionToRoute("task.statistics", id);
        },
        discuss: function(id) {
            this.transitionToRoute("task.discussion", id);
        },
        solution: function(id) {
            this.transitionToRoute("task.solution", id);
        }
    }
});
