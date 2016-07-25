import Ember from "ember";
import config from '../config/environment';

export default Ember.Controller.extend({
    session: Ember.inject.service(),

    calc_score_list: function(data) {
        var groups = new Map();
        var score_list = [];
        data.forEach(function(user) {
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
                    } else {
                        o["num"] = "";
                    }
                }
                result.push(o);
            });
            position += list.length;
        });
        return result;
    },

    results_hs: Ember.computed("model.part_hs", function() {
        return this.calc_score_list(this.get("model.part_hs"));
    }),

    results_other: Ember.computed("model.part_other", function() {
        return this.calc_score_list(this.get("model.part_other"));
    }),

    actions: {
        'export-users': function() {
            var self = this;
            this.set('export_loading', true);
            this.get('session').authorize('authorizer:oauth2', function(header, content) {
                var request = new XMLHttpRequest();
                request.open("GET", config.API_LOC + "/admin/user-export", true);
                request.responseType = "blob";
                request.setRequestHeader(header, content);
                request.onload = function() {
                    self.set('export_loading', false);
                    if (this.status === 200) {
                        var file = window.URL.createObjectURL(this.response);
                        var a = document.createElement("a");
                        a.href = file;
                        a.download = this.response.name || "ksi_resitele.csv";
                        document.body.appendChild(a);
                        a.click();
                        window.onfocus = function() {
                            document.body.removeChild(a);
                        };
                    }
                };
                request.send();
            });
        }
    },

});
