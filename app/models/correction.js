import DS from "ember-data";
import MF from 'model-fragments';
import Ember from 'ember';

export default DS.Model.extend( {
    task_id: DS.belongsTo("task"),
    state: DS.attr("string"),
    user: DS.belongsTo("user"),
    comment: DS.belongsTo("thread", {async: true}),
    achievements: DS.hasMany("achievement"),
    modules: MF.fragmentArray('modulefragment'),
    
    corrected: Ember.computed("state", function() {
        return this.get("state") === "corrected";
    }),
    notcorrected: Ember.computed("state", function() {
        return this.get("state") === "notcorrected";
    }),
    style: Ember.computed("state", function() {
        if (this.get("state") === "corrected") {
            return "correct";
        }
        return "incorrect";
    })
});
 
