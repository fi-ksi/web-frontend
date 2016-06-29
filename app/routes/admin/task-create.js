import Ember from "ember";
import ResetScroll from '../../mixins/reset-scroll';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(ResetScroll, AuthenticatedRouteMixin, {
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
