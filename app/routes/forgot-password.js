import Ember from "ember";
import ResetScrollUn from '../mixins/reset-scroll-unauthenticated';

export default Ember.Route.extend(ResetScrollUn, {
    model: function() {
        /*var profile = this.store.createRecord('profile');
        return profile;*/
        return {};
    },
    title: "KSI: Registrace"
});
