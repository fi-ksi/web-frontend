import Ember from "ember";
import ResetScroll from '../../mixins/reset-scroll';

export default Ember.Route.extend(ResetScroll, {
    model: function() {
        return Ember.RSVP.hash({
            users: this.store.query("user", { filter: "organisators" } ),
            waves: this.store.findAll("wave"),
        });
    },
    title: "KSI: Nová vlna",
});
