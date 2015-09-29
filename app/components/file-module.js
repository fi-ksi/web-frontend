import Ember from "ember";

export default Ember.Component.extend({
    tagName: "",
    classNames: [],
    general_error: undefined,
    endpoint: function() {
        return "/module/" + this.get("module.id") + "/submission";
    }.observes("module.id"),
    valid: false,
    files: undefined,
    actions: {
        file_change: function(files) {
            this.set("file_list", files);
            this.set("files", [].slice.call(files).map(function(i) {return i.name;}));
            this.set("valid", !Ember.isEmpty(files));
        },
        select_files: function() {
            Ember.$("#upload_" + this.get("module.id")).trigger('click');
        }
    },
    module_service: Ember.inject.service("module-service"),
    manage_submit: Ember.on("init", function() {
        this.get("module_service").on("submit", () => {
            if(this.get("valid")) {
                this.set("general_error", undefined);
                this.sendAction("result", "module_" + this.get("module").id, {files: this.get("files")});
            } else {
                this.set("general_error", "Je třeba vybrat alespoň jeden soubor k nahrání!");
                this.sendAction("error", "module_" + this.get("module").id);
            }
        });
    })
});