import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
    session: Ember.inject.service(),
    store: Ember.inject.service(),

    code_loading: false,

    show_check_stdout: false,
    show_merge_stdout: false,

    actions: {
        loadCode: function() {
            var self = this;
            this.set("code_loading", true);
            this.get("store").find("eval-code", this.get("evaluation.eval_id")).then(function(p) {
                self.set("evaluation.code", p);
                self.set("code_loading", false);
            }, function(error) {
                console.log(error);
                self.set("code_loading", false);
                alert("Nepodařilo se načíst data ze serveru!");
            });

        },

        v_check_stdout: function() { this.set("show_check_stdout", !this.get("show_check_stdout"))},
        v_merge_stdout: function() { this.set("show_merge_stdout", !this.get("show_merge_stdout"))},
    },
});
