import Ember from "ember";
import ResetScrollProtected from "../../mixins/reset-scroll-protected";

export default Ember.Route.extend(ResetScrollProtected, {
    model: function(params) {
        return this.store.find("article", params["article_id"]);
    },
    titleToken: function(model) {
        return model.get("title");
    },
    title: function(tokens) {
        return "KSI: " + tokens.pop();
    }
});
