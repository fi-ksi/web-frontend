import DS from "ember-data";
import ResetScrollUnauthenticated from "../mixins/reset-scroll-unauthenticated";

export default DS.Model.extend(ResetScrollUnauthenticated, {
    first_name: DS.attr("string"),
    last_name: DS.attr("string"),
    nick_name: DS.attr("string"),

    profile_pic: DS.attr("string"),
    short_info: DS.attr("string"),
    email: DS.attr("string"),
    gender: DS.attr("string"),

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
});
