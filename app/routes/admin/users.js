import Ember from "ember";
import ResetScroll from '../../mixins/reset-scroll'; // ToDo: Protected route

export default Ember.Route.extend(ResetScroll, {
    title: "KSI: Správa uživatelů"
});
