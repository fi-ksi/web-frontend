import Ember from "ember";

export default Ember.Controller.extend({
    mathObserver: function() {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }.observes("model.details.body"),

    points_text: Ember.computed("model.max_score", function(){
        var points = this.get("model.max_score");
        if (points === 1) { return "bod"; }
        else if ((points === 2) || (points === 3) || (points === 4)) { return "body"; }
        else { return "bodů"; }
    }),
});
