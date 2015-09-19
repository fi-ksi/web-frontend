import Ember from "ember";

export default Ember.Component.extend({
    tagName: "",
    classNames: [],
    general_error: undefined,
    valid: false,
    files: undefined,
    didInsertElement: function() {
        this._super();
        Ember.run.scheduleOnce("afterRender", this, function(){
            
        }); 
    },
    actions: {
        valid: function(files) {
            this.set("valid", true);
            this.set("general_error", undefined);
            this.set("files", files);
        },
        invalid: function() {
            this.set("valid", false);
            this.set("general_error", "Je třeba vybrat alespoň jeden soubor k nahrání!");
            this.set("files", undefined);
        }
    },
    module_service: Ember.inject.service("module-service"),
    manage_submit: Ember.on("init", function() {
        this.get("module_service").on("submit", () => {
            if(this.get("valid")) {
                this.sendAction("result", "module_" + this.get("module").id, {});
                this.get("file_upload").send("upload");
            } else {
                this.set("general_error", "Je třeba vybrat alespoň jeden soubor k nahrání!");
                this.sendAction("error", "module_" + this.get("module").id);
            }
        });
    })
});