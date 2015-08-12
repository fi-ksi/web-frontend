import Ember from 'ember';

export default Ember.Component.extend({
    tagName: "div",
    elementId: "editor",
    classNames: ["code_editor"],
    didInsertElement: function() {
        Ember.run.scheduleOnce('afterRender', this, function(){
            this.editor = window.ace.edit("editor");
            this.editor.setTheme("ace/theme/monokai");
            this.editor.getSession().setMode("ace/mode/python");
        }); 
    }
});
