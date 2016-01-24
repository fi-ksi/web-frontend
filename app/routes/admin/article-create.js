import Ember from "ember";
import ResetScroll from '../../mixins/reset-scroll';

export default Ember.Route.extend(ResetScroll, {
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
