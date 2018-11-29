import Ember from "ember";

export default Ember.Controller.extend( {
    session: Ember.inject.service(),

    is_tom: Ember.computed("session.current_user", function(){
        return this.get("session.current_user.id") === "23";
    }),
});
