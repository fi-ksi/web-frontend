import Ember from "ember";

export default Ember.Controller.extend( {
    store: Ember.inject.service(),
    session: Ember.inject.service(),

    waves: Ember.computed("store", "model.waves", "session.current_user", function(){
        var user = this.get("session.current_user");
        return this.get("model.waves").sortBy("id").map(function(wave) {
            if (user) {
                wave.set("can_add", ((user.get("id") === wave.get("garant.id")) && (new Date() < wave.get("time_published"))) || (user.get("admin")));
                wave.set("can_delete", (new Date() < wave.get("time_published")) && (user.get("admin")));
            }
            return wave;
        });
    }),

    wave_points: Ember.computed.map('model.waves', function(wave) { return wave.get("sum_points"); }),
    wave_tasks: Ember.computed.map('model.waves', function(wave) { return wave.get("tasks_cnt"); }),
    sum_points: Ember.computed.sum("wave_points"),
    sum_tasks_cnt: Ember.computed.sum("wave_tasks"),

    actions: {
        'wave-delete': function(wave) {
            if(!confirm("Opravdu odstranit vlnu " + wave.get("caption") + "?")) {
                return;
            }

            wave.set("deleting", true);
            wave.destroyRecord();
            this.get("waves").removeObject(wave);
        },
    },

});
