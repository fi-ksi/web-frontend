import Ember from "ember";
import ResetScroll from '../../mixins/reset-scroll';

export default Ember.Route.extend(ResetScroll, {
	model: function(params) {
		return Ember.RSVP.hash({
			orgs: this.store.findQuery("user", { filter: "organisators" } ),
			wave: this.store.find("wave", params["wave_id"]),
			tasks: this.store.findQuery("atask", { wave: params["wave_id"] }),
			// roky se nacitaji kvuli tomu, aby se v momente vyplneni nazvu ulohy nemusel pro odvozeni git_branch a git_path delat pozadavek na backend
			years: this.store.findAll("year")
		});
	},
	title: "KSI: Nová úloha"
});
