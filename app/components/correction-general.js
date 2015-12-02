import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
    session: Ember.inject.service(),
    store: Ember.inject.service(),
    lastInput: undefined,
	inputObserver: function() {
        if (this.get("lastInput") === this.get("module.evaluation.points")) {
            return;
        }
        var points = this.get("module.evaluation.points");
        if(points > 10) {
            this.set("module.evaluation.points", 10);
        }
        if(points < 0) {
            this.set("module.evaluation.points", 0);
        }
        this.set("lastInput", this.get("module.evaluation.points"));
		this.sendAction("dirty");
	}.observes("module.evaluation.points"),
    actions: {
    },
});
