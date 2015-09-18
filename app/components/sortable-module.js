import Ember from 'ember';

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
    submit: function() {
        // Returns object with the solution or undefined if cannot submit
        var id = "#sortable" + this.get("id");
        if (Ember.$(id + "b li").length !== 0) {
            this.set("general_error", "Musíš použít všechny řádky kódu!");
            return undefined;
        }
        this.set("general_error", undefined);

        // Collect the solution
        var result = [];
        Ember.$(id + "a li").each(function() {
            result.append(Ember.$(this).attr("id"));
        });

        return {
            solution: result
        };
    }
});