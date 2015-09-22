import Ember from "ember";
import ResetScrollProtected from '../mixins/reset-scroll-protected';

export default Ember.Route.extend(ResetScrollProtected, {
    model: function() {
        return this.get("session.current_user");
    },
    title: "KSI: Nastavení"
});
