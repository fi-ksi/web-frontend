import Ember from "ember";

export default Ember.Component.extend({
    tagName: "",
    classNames: [],
    is_editing: false,
    show: function() {
        return this.get("is_editing") || !this.get("module.is_correct");
    }.property("is_editing", "module.state"),
    didInsertElement: function() {
        this._super();
        Ember.run.scheduleOnce("afterRender", this, function(){
        });
    },
    actions: {
        trigger: function() {
            if (this.get("show")) {
                // ToDo: Odevzdat
                this.get("module_logic").send("submit");
            }
            else {
                this.set("is_editing", true);
            }
        },
        submit_done: function() {
            this.set("is_editing", false);
        }
    }
});
