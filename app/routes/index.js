import Ember from "ember";
import ResetScroll from '../mixins/reset-scroll';

export default Ember.Route.extend(ResetScroll, {
    articles_limit: 2,
    model: function() {
        return Ember.RSVP.hash( {
            articles: this.store.query("article", {
                _start: 0,
                _limit: this.get("articles_limit")
            }),
            organisators: this.store.findQuery("user", { filter: "organisators", sort: "score" } )
        });
    },
});
