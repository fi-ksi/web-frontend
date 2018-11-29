import Ember from "ember";

export default Ember.Controller.extend( {
    store: Ember.inject.service(),
    session: Ember.inject.service(),

    actions: {
        'year-delete': function(year) {
            if(!confirm("Opravdu odstranit ročník " + year.get("year") + "?")) {
                return;
            }

            year.set("deleting", true);
            year.destroyRecord().then({}, function(error) {
                year.set("deleting", false);
                alert("Ročník se nepodařilo odstranit, kontaktuj administrátora:\n" + error);
            });
        },
    },

});
