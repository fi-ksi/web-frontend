import Ember from "ember";

export default Ember.Route.extend({
    beforeModel: function() {
        window.location.replace("https://kscuk.fi.muni.cz/");
    },
    view: null,
    title: "KSCUK"
});
