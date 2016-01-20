import Ember from "ember";

export default Ember.Controller.extend( {
    store: Ember.inject.service(),
    session: Ember.inject.service(),

    waves: Ember.computed("store", "model.waves", "session.current_user", function(){
        var user = this.get("session.current_user");
        return this.get("model.waves").sortBy("id").map(function(wave) {
            if (user) {
                wave.set("can_add", ((user.get("id") === wave.get("garant.id")) && (new Date() < wave.get("time_published"))) || (user.get("admin")));
            }
            return wave;
        });
    }),
});
