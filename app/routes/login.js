import Ember from "ember";
import ResetScrollUnauthenticated from "../mixins/reset-scroll-unauthenticated";

export default Ember.Route.extend(ResetScrollUnauthenticated, {
    setupController: function() {
        Ember.run.schedule('afterRender', this, function() {
            Ember.$("#login_button").click();
        });
    }
});
