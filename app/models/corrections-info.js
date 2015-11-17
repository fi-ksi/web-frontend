import DS from "ember-data";
import Ember from "ember";

export default DS.Model.extend( {
	title: DS.attr("string"),
	wave: DS.belongsTo("wave"),
	author: DS.belongsTo("user", {async: true}),
	corr_state: DS.attr("string"),
	solvers: DS.hasMany("user")
});
