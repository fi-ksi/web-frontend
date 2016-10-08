import Ember from "ember";

export default Ember.Component.extend({
    tagName: "",
    classNames: [],
    is_editing: false,
    submitting: false,
    session: Ember.inject.service(),
    show: function() {
        return this.get("is_editing") || !this.get("module.is_correct") || this.get("module.is_general");
    }.property("is_editing", "module.state"),
    didInsertElement: function() {
        this._super();
        Ember.run.scheduleOnce("afterRender", this, function(){
        });
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
            this.set("is_editing", false);
            this.sendAction("submit");
        }
    }
});
