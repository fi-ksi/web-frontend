import Ember from "ember";

export default Ember.Controller.extend({
    store: Ember.inject.service(),
    session: Ember.inject.service(),

    module_id: null,
    user_id: null,
    execs: [],
    page: undefined,
    total: undefined,

    queryParams: ["module", "user"],

    load_execs: function() {
        this.set("filter_in_progress", true);

        var params = {
            "user": this.get("user_id"),
            "module": this.get("module_id"),
        };

        var self = this;
        this.get("store").unloadAll("exec");
        this.get("store").find("exec", params).then(function(p) {
            self.set("execs", p);
            self.set("filter_in_progress", false);
            self.set("total", p.get("meta.total"));
            self.set("page", p.get("meta.page"));
        }, function(error) {
            console.log(error);
            self.set("filter_in_progress", false);
            alert("Nepodařilo se načíst data ze serveru!");
        });

    },

    paramsObserver: function() {
        var m = this.get("module");
        var u = this.get("user");

        if (m) {
            this.set("module_id", m);
        }
        if (u) {
            this.set("user_id", u);
        }

        if (m && u) {
            this.load_execs();
        }
    }.observes("module", "user"),

    execs_sorted: Ember.computed.sort("execs", function(a, b) {
        if (a.get("time") < b.get("time")) { return 1; }
        if (a.get("time") > b.get("time")) { return -1; }
        return 0;
    }),

    actions: {
        'filter': function() {
            this.load_execs();
        },

        'code': function(exec) {
            exec.set("show_code", !exec.get("show_code"));
        },

        'report': function(exec) {
            exec.set("show_report", !exec.get("show_report"));
        },

    }
});
