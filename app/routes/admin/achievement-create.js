import Ember from "ember";
import ResetScroll from '../../mixins/reset-scroll';

export default Ember.Route.extend(ResetScroll, {
    model: function() {
        return this.store.find("content", "achievements");
    },
    title: "KSI: Nová trofej",
    actions: {
      willTransition: function() {
        this.controller.set('save_status', "");
        this.controller.set('error_status', "");
      }
    }
});
