import DS from "ember-data";
import Ember from "ember";

export default DS.Model.extend( {
	task_id: DS.belongsTo("task"),
	state: DS.attr("string"),
	user: DS.belongsTo("user"),
	comment: DS.belongsTo("thread"),
	achievements: DS.hasMany("achievement")
});
