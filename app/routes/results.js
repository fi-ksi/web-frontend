import Ember from "ember";
import ResetScroll from '../mixins/reset-scroll';

export default Ember.Route.extend(ResetScroll, {
    model: function() {
        this.store.unloadAll("user");
        return Ember.RSVP.hash({
            part_hs: this.store.query("user", { filter: "part-hs" , sort: "score" } ),
            part_other: this.store.query("user", { filter: "part-other" , sort: "score" } )
        });
    },
    title: "KSI: Výsledky"
});
