import Ember from 'ember';

export default Ember.Component.extend({
    tagName: "",
    didInsertElement: function() {
    	console.log("Hcaptions begin");
        Ember.run.scheduleOnce('afterRender', this, function(){
            /*Ember.$(window).load(function(){*/
            	console.log("Hcaptions loaded!");
                Ember.$('.hcaption').hcaptions();
                Ember.$('.hcaption').each(function() {
                	console.log("Element!");
                });
            /*});*/
        });
    }
});
