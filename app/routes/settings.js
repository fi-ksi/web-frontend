import Ember from "ember";
import ResetScroll from '../mixins/reset-scroll';

export default Ember.Route.extend(ResetScroll, {
    model: function() {
        return this.get("session.current_user");
    },
    title: "KSI: Nastavení"
});
