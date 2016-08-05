import Ember from "ember";
import ResetScrollProtected from "../../mixins/reset-scroll-protected";

export default Ember.Route.extend(ResetScrollProtected, {
    title: "KSI: Nový článek",
    actions: {
        willTransition: function() {
            this.controller.set('title', "");
            this.controller.set('body', "");
            this.controller.set('published', false);
            this.controller.set('picture', "");
        }
    }
});
