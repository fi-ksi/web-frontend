import DS from "ember-data";
import basicProfile from './basic-profile';

/* This profile extendes BasicProfile model class.
 * It contains all the information about user.
 */

export default basicProfile.extend( {
    achievements: DS.hasMany("achievement", {async: true, defaultValue: []}),
    score: DS.attr("number"),
    percentile: DS.attr("number"),
    seasons: DS.hasMany("year", {async: true}),
    percent: DS.attr("number"),
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

    notify_eval: DS.attr("boolean"),
    notify_response: DS.attr("boolean"),
    notify_ksi: DS.attr("boolean"),
    notify_events: DS.attr("boolean"),

    // my submitted tasks
    tasks: DS.hasMany("task", { defaultValue: [], async: true }),
});
