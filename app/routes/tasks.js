import Ember from "ember";
import ResetScroll from '../mixins/reset-scroll';

export default Ember.Route.extend(ResetScroll, {
    model: function() {
        this.store.unloadAll("task");
        this.store.unloadAll("task-detail");
        this.store.unloadAll("module");
        return Ember.RSVP.hash({
            tasks: this.store.findAll("task", ""),
        });
    },
    title: "KSI: Úlohy"
});
