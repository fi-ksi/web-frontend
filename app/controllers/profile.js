import Ember from "ember";
import UserSettings from "../mixins/user-settings";

export default Ember.Controller.extend(UserSettings, {
    session: Ember.inject.service(),

    // Split results into waves
    // Important: waves must be loaded when processing this property
    results: Ember.computed("model.results", "waves", function() {
        if (!this.get("waves")) { return undefined; }
        if (!this.get("model.results")) { return undefined; }
        var res = [];

        this.get("model.results").forEach(function(item) {
            var wave_id = item.get("task.wave.id");
            if (!res[wave_id]) {
                res[wave_id] = Ember.Object.extend();
                res[wave_id].tasks = [item];
                res[wave_id].wave = item.get("task.wave");
                res[wave_id].max_score = item.get("task.max_score");
                res[wave_id].score = item.get("score");
                res[wave_id].sum_points = item.get("task.wave.sum_points");
            } else {
                res[wave_id].tasks.addObject(item);
                res[wave_id].max_score += item.get("task.max_score");
                res[wave_id].score += item.get("score");
            }
        });

        // calc percentages
        res.forEach(function(item) {
            item.percentage_submitted = ((item.score / item.max_score) * 100).toFixed(0);
            item.percentage_all = ((item.score / item.sum_points) * 100).toFixed(0);
        });

        return res;
    }),

    country: Ember.computed("model.addr_country", function() {
        var self = this;
        var arr = this.get("countries").filter(function(e) {
            return e.short === self.get("model.addr_country");
        });
        arr.push({ name: "" });
        return arr[0].name;
    }),

    tasks: Ember.computed("model.gender", function() {
        if(this.get("model.gender") === "male") {
            return "Organizátorovy úlohy";
        } else if (this.get("model.gender") === "female") {
            return "Organizátorčiny úlohy";
        }
        return null;
    }),

    no_tasks: Ember.computed("model.gender", function() {
        if(this.get("model.gender") === "male") {
            return "Tento organizátor ještě žádnou úlohu zatím nevytvořil, ale na nějaké určitě pracuje!";
        } else if (this.get("model.gender") === "female") {
            return "Tato organizátorka ještě žádnou úlohu zatím nevytvořila, ale na nějaké určitě pracuje!";
        }
        return null;
    }),

    // Z nejakeho duvodu v sablone zlobi session.current_user.organisator
    // (pravdepodobne diky pouzivani controlleru a sablony z vice rout)
    // Toto reseni se zda byt funkcni.
    is_current_user_org: Ember.computed("session.current_user.organisator", function(){
        return this.get("session.current_user.organisator");
    }),

});
