import DS from "ember-data";
import Ember from "ember";
import config from '../config/environment';

export default DS.Model.extend( {
    // Relevant only if displaing user profile
    signed_in: DS.attr("boolean", {default: false}),

    first_name: DS.attr("string"),
    last_name: DS.attr("string"),
    nick_name: DS.attr("string"),
    full_name: Ember.computed("first_name", "nick_name", "last_name", function() {
        //console.log(this.get("nick_name"));
        if(this.get("nick_name") === undefined || this.get("nick_name").length === 0) {
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
    email: DS.attr("string"),
    gender: DS.attr("string"),

    // Relevant only when not organisator or admin
    achievements: DS.hasMany("achievement", {async: true, defaultValue: []}),
    score: DS.attr("number"),
    percentile: DS.attr("number"),
    seasons: DS.attr("number"),
    successful: DS.attr("number"),
    results: DS.hasMany("task-score", {defaultValue: []}),
    tasks_num: DS.attr("number"),

    addr_street: DS.attr("string"),
    addr_city: DS.attr("string"),
    addr_zip: DS.attr("string"),
    addr_country: DS.attr("string"),

    school_name: DS.attr("string"),
    school_street: DS.attr("string"),
    school_city: DS.attr("string"),
    school_zip: DS.attr("string"),
    school_country: DS.attr("string"),
    school_finish: DS.attr("number"),

    tshirt_size: DS.attr("string"),

    // Relevant only when organisator
    role: DS.attr("string", {defaultValue: "participant"}),
    admin: Ember.computed("role", function(){
        return this.get("role") === "admin";
    }),

    organisator: Ember.computed("role", function(){
        return this.get("role") === "org";
    }),

    // this property must be here, it defines the difference between user and profile
    // (orgs public "user" does not show his solved tasks, private "profile" does it)
    show_solved: true,

    tasks: DS.hasMany("task", {defaultValue: [], async: true}),

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
