import Ember from "ember";

export default Ember.Component.extend({
    tagName: "",
    classNames: [],
    is_editing: false,
    submitting: false,
    show_report: false,
    report_button_text: "Zobrazit report",

    session: Ember.inject.service(),
    show: function() {
        return this.get("is_editing") || !this.get("module.is_correct") || this.get("module.is_general");
    }.property("is_editing", "module.state"),

    didRender: function() {
        MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    },

    actions: {
        submit: function() {
            this.set("submitting", true);
            this.get("module_logic").send("submit");
        },
        show: function() {
            this.set("is_editing", true);
        },
        submit_done: function() {
            this.set("submitting", false);
        },
        submit_succ_done: function() {
            this.set("submitting", false);
            if ( this.getWithDefault("module.blockClosing", false) === false ){
                this.set("is_editing", false);
            }
            this.sendAction("submit");
        },
        set_report_button_text: function(){
            if(this.get("module.show_report")) {
                this.set("report_button_text", "Skrýt report");
            } else {
                this.set("report_button_text", "Zobrazit report");
            }
        },
        toggle_report: function() {
            this.set("module.show_report", !this.get("module.show_report"));
            this.send("set_report_button_text");
        }
    }
});
