import DS from "ember-data";
import Ember from "ember";
import config from '../config/environment';

export default DS.Model.extend({
	title: DS.attr("string"),
	author: DS.belongsTo("user", { async: true }),
	
	git_branch: DS.attr("string"),
    git_commit: DS.attr("string"),
    git_path: DS.attr("string"),
    
    wave: DS.belongsTo("wave", { async: true })
});
