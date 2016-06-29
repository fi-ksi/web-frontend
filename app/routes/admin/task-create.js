import Ember from "ember";
import ResetScrollProtected from "../../mixins/reset-scroll-protected";

export default Ember.Route.extend(ResetScrollProtected, {
    model: function(params) {
        return Ember.RSVP.hash({
            orgs: this.store.query("user", { filter: "organisators" } ),
            wave: this.store.find("wave", params["wave_id"]),
            tasks: this.store.query("atask", { wave: params["wave_id"] }),
            // roky se nacitaji kvuli tomu, aby se v momente vyplneni nazvu ulohy nemusel pro odvozeni git_branch a git_path delat pozadavek na backend
            years: this.store.findAll("year")
        });
    },
    title: "KSI: Nová úloha",
    actions: {
        willTransition: function() {
            this.controller.set('git_create', true);
            this.controller.set('title', "");
            this.controller.set('author', undefined);
            this.controller.set('git_branch', "");
            this.controller.set('git_path', "");
            this.controller.set('git_commit', "");
            this.controller.set('saving', false);
            this.controller.set("error_status", "");
        }
    }
});
