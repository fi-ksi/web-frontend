import Ember from "ember";
import ResetScroll from '../mixins/reset-scroll';

export default Ember.Route.extend(ResetScroll, {
    model: function() { 
        this.store.unloadAll("thread");
        return this.store.findAll("thread", "");
    },
    title: "KSI: Diskuse",
    setupController: function(controller, model) {
        this._super(controller, model);
        controller.set('model', model);
        controller.set('info', null);
        controller.set('new_thread', false);
    },
});
