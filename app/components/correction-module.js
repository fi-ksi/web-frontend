import Ember from 'ember';

export default Ember.Component.extend({
    session: Ember.inject.service(),
    store: Ember.inject.service(),

    lastInput: undefined,
    lastCorrector: undefined,
    eval: null,

    inputObserver: function() {
        if (!this.get("module.evaluation")) { return; }
        if (this.get("lastInput") === this.get("module.evaluation.points")) {
            return;
        }
        var points = this.get("module.evaluation.points");
        if (isFinite(points) && isFinite(this.get("lastInput"))) {
          this.sendAction("dirty");

          if (this.get("module.evaluation.corrected_by") === null) {
              // zadny opravujici -> nastavime na aktualne prihlaseneho uzivatele
              var self = this;
              this.get("store").find("user", this.get("session.current_user.id")).then(function(p) {
                self.set("module.evaluation.corrected_by", p.get("id"));
              });
          }
        }
        /*if(points > 10) {
            this.set("module.evaluation.points", 10);
        }*/
        if(points < 0) {
            this.set("module.evaluation.points", 0);
        }
        this.set("lastInput", this.get("module.evaluation.points"));
    }.observes("module.evaluation.points"),

    correctorObserver: function(){
        if (!this.get("module.evaluation")) { return; }
        if (this.get("lastCorrector") !== undefined) {
            if (this.get("lastCorrector") === this.get("module.evaluation.corrected_by")) { return; }
            this.sendAction("dirty");
       }
       this.set("lastCorrector", this.get("module.evaluation.corrected_by"));
    }.observes("module.evaluation.corrected_by"),

    parent_module: Ember.computed("module.module_id", function() {
        return this.get("store").find("module", this.get("module.module_id"));
    }),

    module_class: Ember.computed("module.evaluation", function() {
        if (this.get("module.evaluation.general")) {
            return "col-md-6";
        } else {
            return "col-md-12";
        }
    }),

    points_class: Ember.computed("module.evaluation", function() {
        if (this.get("module.evaluation.general")) {
            return "";
        } else {
            return "col-md-6";
        }
    }),

    eval_observer: function() {
        this.set("eval", this.get("module.evaluation.eval_id"));
    }.observes("module.evaluation.eval_id"),

    actions: {
        'log': function() {
            this.set("show_log", !this.get("show_log"));
        },

        'selectEval': function() {
        },

        'loadEval': function() {
            var evl_id = this.get("eval_id");
            this.set("eval_loading", true);
            this.set("module.evaluation", null);

            var self = this;
            //this.get("store").unloadAll("evaluation");
            this.get("store").find("evaluation", evl_id).then(function(p) {
                self.set("eval_loading", false);
                self.set("module.evaluation", p);
            }, function(err) {
                console.log(err);
                alert("Nepodařilo se načíst data ze serveru!");
                self.set("eval_loading", false);
            });

        },
    },

});
