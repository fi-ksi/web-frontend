import DS from "ember-data";
import Ember from "ember";

export default DS.Model.extend({
    title: DS.attr("string"),
    author: DS.belongsTo("user", { async: true }),
    co_author: DS.belongsTo("user", { async: true }),

    git_branch: DS.attr("string"),
    git_commit: DS.attr("string"),
    git_path: DS.attr("string"),
    git_create: DS.attr("boolean"), // pouze pro ucely vytvareni nove ulohy

    deploy_date: DS.attr("date"),
    deploy_status: DS.attr("string"),

    max_score: DS.attr("number"),
    wave: DS.belongsTo("wave", { async: true }),

    eval_comment: DS.attr("string"),

    deploy_status_default: Ember.computed("deploy_status", function() { return this.get("deploy_status") === "default"; }),
    deploy_status_deploying: Ember.computed("deploy_status", function() { return this.get("deploy_status") === "deploying"; }),
    deploy_status_done: Ember.computed("deploy_status", function() { return this.get("deploy_status") === "done"; }),
    deploy_status_error: Ember.computed("deploy_status", function() { return this.get("deploy_status") === "error"; }),
    deploy_status_diff: Ember.computed("deploy_status", function() { return this.get("deploy_status") === "diff"; }),

    git_commit_short: Ember.computed("deploy_status", function() {
        if (this.get("git_commit")) {
            return this.get("git_commit").substring(0,8) + "...";
        } else {
            return undefined;
        }
    }),

    git_defined: Ember.computed("git_branch", "git_path", function(){
        return this.get("git_branch") && this.get("git_path");
    }),

    github_path: Ember.computed("git_branch", "git_path", function(){
        return "https://github.com/fi-ksi/seminar/tree/" + this.get("git_branch") + "/" + this.get("git_path");
    }),
});
