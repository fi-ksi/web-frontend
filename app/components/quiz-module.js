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
            var self = this;
            var valid = true;
            var response = [];
            this.get("module.questions.questions").forEach(function(question, index) {
                var checked = Ember.$(".group_" + self.get("id") + "_" + index).filter(function() {
                    return Ember.$(this).is(":checked");
                });
                if(checked.length === 0) {
                    // there aren't checked items!
                    valid = false;
                    console.log("Invalid! " + "#w_" + self.get("id") + "_" + index);
                    Ember.$("#w_" + self.get("id") + "_" + index).removeClass("hide");
                    response.push(undefined);
                } else {
                    Ember.$("#w_" + self.get("id") + "_" + index).addClass("hide");
                    var c = [];
                    checked.each(function() {
                        c.push(Ember.$(this).attr("id").split("_").pop());
                    });
                    response.push(c);
                }
            });
            if(!valid) {
                this.sendAction("error", "module_" + this.get("module").id);
                return;
            }
            
            this.sendAction("result", "module_" + this.get("module").id, {solution: response});
        });
    }),
    release_submit: Ember.on('willDestroyElement', function () {
        this.get('module_service').off('submit', this);
    })
});