import DS from "ember-data";
import Ember from "ember";
import config from '../config/environment';

export default DS.Model.extend( {
    first_name: DS.attr("string"),
    last_name: DS.attr("string"),
    nick_name: DS.attr("string"),
    full_name: Ember.computed("first_name", "nick_name", "last_name", function() {
        if ((!this.get("nick_name")) || (this.get("nick_name").length === 0)) {
            return this.get("first_name") + ' ' + this.get("last_name");
        }
        return this.get("first_name") + ' "' + this.get("nick_name") + '" ' + this.get("last_name");
    }),
    surname_first_name: Ember.computed("first_name", "last_name", function() {
        return this.get("last_name") + ' ' + this.get("first_name");
    }),
    profile_picture: DS.attr("string"),
    profile_picture_r: Ember.computed("profile_picture", "gender", function() {
        var p = this.get("profile_picture");
        if (p) { return config.API_LOC + p; }
        if (this.get("gender") === "female") {
            return "/img/avatar-default-woman.svg";
        } else {
            return "/img/avatar-default.svg";
        }
    }),
    short_info: DS.attr("string"),
    gender: DS.attr("string"),

    // Relevant only when user
    score: DS.attr("number"),
    tasks_num: DS.attr("number"),
    achievements: DS.hasMany("achievement", {async: true}),
    school_name: DS.attr("string"),
    addr_country: DS.attr("string"),
    seasons: DS.hasMany("year", {async: true}),
    successful: DS.attr("boolean"),

    role: DS.attr("string", {defaultValue: "participant"}),
    admin: Ember.computed("role", function(){
        return this.get("role") === "admin";
    }),

    organisator: Ember.computed("role", function(){
        return (this.get("role") === "org") || (this.get("role") === "admin");
    }),

    participant: Ember.computed("role", function(){
        return this.get("role") === "participant";
    }),

    tester: Ember.computed("role", function(){
        return this.get("role") === "tester";
    }),

    score_inverted: Ember.computed("score", function(){
        return -this.get("score");
    }),

    // this property must be here, see ./profile.js
    show_solved: Ember.computed("role", function(){
        return this.get("role") === "participant";
    }),

    // Relevant only when organisator
    tasks: DS.hasMany("task", { defaultValue: [], async: true, inverse: 'author' }),
    co_tasks: DS.hasMany("task", { defaultValue: [], async: true, inverse: 'co_author' }),
    email: DS.attr("string"),

    any_task: Ember.computed("tasks", "co_tasks", function() {
        return (this.get("tasks.length") > 0) || (this.get("co_tasks.length") > 0);
    }),

    role_str: Ember.computed("gender", "role", function() {
        var ret = "";
        if ((this.get("role") === "org") || (this.get("role") === "admin")) {
            ret = "organizátor";
        }
        if (this.get("role") === "participant") {
            ret = "řešitel";
        }
        if (this.get("role") === "tester") {
            ret = "tester";
        }
        if (this.get("gender") === "female") {
            ret = ret + "ka";
        }
        return ret;
    }),

    // Musi tu byt pro spravnou funkci endpointu /profile.
    signed_in: true,

});
