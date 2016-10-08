import Ember from "ember";

export default Ember.Controller.extend({
    session: Ember.inject.service(),
    storage: Ember.inject.service(),

    reload_status: null,

    points_text: Ember.computed("model.max_score", function(){
        var points = this.get("model.max_score");
        if (points === 1) { return "bod"; }
        else if ((points === 2) || (points === 3) || (points === 4)) { return "body"; }
        else { return "bodů"; }
    }),

    // Reload task when deployed in another browser window.
    taskToReload: function() {
        var task_id = this.get("storage.taskToReload");
        if (task_id === this.get("model.id")) { this.send("updateTask"); }
    }.observes("storage.reloadTask"),

    actions: {
        // Aktualizovat ulohu, detaily a vsechny moduly.
        updateTask: function() {
            var self = this;
            this.set("reload_status", "Aktualizuji...");

            this.get("model").reload().then(function(task) {
                task.get("details").then(function(details) {
                    details.reload().then(function(details) {
                        details.get("modules").forEach(function(module) {
                            module.reload();
                        });
                        self.set("reload_status", "Aktualizováno<br>"+(new Date()).toLocaleFormat('%H:%M:%S'));
                    });

                });
            });
       },

        hideUpdate: function() {
            this.set("reload_status", null);
        },
    },

    init: function() {
        this.set("storage.reloadTask", false);
    }
});
