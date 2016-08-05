import Ember from 'ember';

export default Ember.Component.extend({
    tagName: "div",
    elementId: "editor",
    classNames: ["code_editor"],
    didInsertElement: function() {
        this._super();
        Ember.run.scheduleOnce('afterRender', this, function(){
            this.editor = window.ace.edit(this.get("id"));
            this.editor.setTheme("ace/theme/monokai");
            this.editor.getSession().setMode("ace/mode/python");
            this.editor.setAutoScrollEditorIntoView(true);
            this.editor.setOption("maxLines", 50);
        });
    }
});
