import Ember from "ember";

export default Ember.Component.extend({
    tagName: "",
    classNames: [],
    didInsertElement: function() {
        this._super();
        Ember.run.scheduleOnce("afterRender", this, function(){
            
        }); 
    },
    module_service: Ember.inject.service("module-service"),
    manage_submit: Ember.on("init", function() {
        this.get("module_service").on("submit", () => {
            this.sendAction("result", "module_" + this.get("module").id, {});
        });
    })
});