import DS from "ember-data";
import Ember from "ember";
import config from '../config/environment';

export default DS.Model.extend( {
    first_name: DS.attr("string"),
    last_name: DS.attr("string"),
    nick_name: DS.attr("string"),
    full_name: Ember.computed("first_name", "nick_name", "last_name", function() {
        //console.log(this.get("nick_name"));
        if(!this.get("nick_name") || this.get("nick_name").length === 0) {
            return this.get("first_name") + ' ' + this.get("last_name");
        }
        return this.get("first_name") + ' "' + this.get("nick_name") + '" ' + this.get("last_name");
    }),
    profile_picture: DS.attr("string"),
    profile_picture_r: Ember.computed("profile_picture", function() {
        var p = this.get("profile_picture");
        if(p) {
            return config.API_LOC + p;
        }
        return "/img/avatar-default.svg";
    }),
    short_info: DS.attr("string"),
    gender: DS.attr("string"),

    // Relevant only when user
    score: DS.attr("number"),
    tasks_num: DS.attr("number"),
    achievements: DS.hasMany("achievement", {async: true}),
    school_name: DS.attr("string"),
    addr_country: DS.attr("string"),
    seasons: DS.attr("number"),

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

    // this property must be here, see ./profile.js
    show_solved: Ember.computed("role", function(){
        return this.get("role") === "participant";
    }),

    // Relevant only when organisator
    tasks: DS.hasMany("tasks", {async: true}),
    email: DS.attr("string"),

    role_str: Ember.computed("gender", "role", function() {
        var ret = "";
        if (this.get("role") === "org") {
            ret = "organizátor";
        }
        if (this.get("role") === "admin") {
            ret = "administrátor";
        }
        if (this.get("role") === "participant") {
            ret = "řešitel";
        }
        if (this.get("gender") === "female") {
            ret = ret + "ka";
        }
        return ret;
    }),

});
