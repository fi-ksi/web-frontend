import Ember from "ember";

export default Ember.Controller.extend({
    session: Ember.inject.service(),
    submitted: Ember.computed('model.details.modules.[]', function() {
        var res = false;
        var modules = this.get('model.details.modules');
        if (!modules) {
            return false;
        }
        modules.mapBy('score.score').forEach(function(score) {
            res |= typeof score !== 'undefined';
        });
        return res;
    }),
    sum: Ember.computed('model.details.modules.[]', function() {
        var sum = 0;
        this.get('model.details.modules').mapBy('score.score').forEach(function(score) {
          sum = sum + score;
        });
        return Math.floor(sum * 100) / 100;
    }),
    progress_width: function() {
        var res = this.get("sum") / this.get("model.max_score") * 100;
        if (res > 100) {
            res = 100;
        }
        return new Ember.Handlebars.SafeString('width: ' + Math.round(res) + '%');
    }.property("sum", "model.max_score")
});
