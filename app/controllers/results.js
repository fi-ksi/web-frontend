import Ember from "ember";

export default Ember.Controller.extend({
    results: Ember.computed("model", function() {
        var groups = new Map();
        var score_list = [];
        this.get("model").forEach(function(user) {
            var score = user.get("score");
            if(groups.has(score)) {
                groups.get(score).push(user);
            } else {
                groups.set(score, [user]);
            }
            if(score_list.length === 0 || score_list[score_list.length - 1] !== score) {
                score_list.push(score);
            }
        });
        
        var result = [];
        var position = 1;
        score_list.forEach(function(num) {
            var list = groups.get(num);
            var notused = true;
            list.sort(function(a, b) {
                return a.get("tasks_num") < b.get("tasks_num");
            });
            list.forEach(function(user) {
                var o = {
                  "user": user 
                };
                if (list.length === 1) {
                    o["num"] = position;
                } else {
                    if (notused) {
                        o["num"] = position.toString() + "–" + (position + list.length - 1).toString() + ".";
                        // notused = false;
                    } else {
                        o["num"] = "";
                    }
                }
                result.push(o);
            });
            position += list.length;
        }); 
        return result;     
    })
});
