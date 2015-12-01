import DS from "ember-data";
import MF from 'model-fragments';

export default DS.Model.extend( {
	task_id: DS.belongsTo("task"),
	state: DS.attr("string"),
	user: DS.belongsTo("user"),
	comment: DS.belongsTo("thread", {async: true}),
	achievements: DS.hasMany("achievement"),
	modules: MF.fragmentArray('modulefragment')
});
