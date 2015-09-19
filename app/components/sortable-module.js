import Ember from "ember";

export default Ember.Component.extend({
    tagName: "div",
    classNames: ["controls row"],
    didInsertElement: function() {
        this._super();
        Ember.run.scheduleOnce('afterRender', this, function(){
            var self = this;
            // Documentation: https://github.com/voidberg/html5sortable
            var id = "#sortable" + this.get("id");
            Ember.$(id + "a, " + id + "b").sortable({
                connectWith: ".connect" + this.get("id"),
                handle: ".handle"
            }).bind('sortstop', function() {
                if (self.get("general_error") && Ember.$(id + "b li").length !== 0) {
                    self.set("general_error", "Musíš použít všechny řádky kódu!");
                }
                else {
                    self.set("general_error", undefined);
                }
            });
        }); 
    },
    general_error: undefined,
    module_service: Ember.inject.service("module-service"),
    manage_submit: Ember.on("init", function() {
        var self = this;
        this.get("module_service").on("submit", () => {
            // Returns object with the solution or undefined if cannot submit
            var id = "#sortable" + self.get("id");
            if (Ember.$(id + "b li").length !== 0) {
                self.set("general_error", "Musíš použít všechny řádky kódu!");
                self.sendAction("error", "module_" + this.get("module.id"));
                return;
            }
            self.set("general_error", undefined);

            // Collect the solution
            var result = [];
            Ember.$(id + "a li").each(function() {
                result.push(Ember.$(this).attr("id"));
            });

            self.sendAction("result", "module_" + self.get("module.id"), {solution: result});
            console.log("Action sent!");
        });
    }),
    release_submit: Ember.on('willDestroyElement', function () {
        this.get('module_service').off('submit', this);
    })
});