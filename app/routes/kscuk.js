import Ember from "ember";

export default Ember.Route.extend({
    beforeModel: function(param) {
        window.location.replace("http://kscuk.fi.muni.cz/");
    },
    view: null,
    title: "KSCUK"
});
