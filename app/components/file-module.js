import Ember from "ember";
import InboundActions from 'ember-component-inbound-actions/inbound-actions';

export default Ember.Component.extend(InboundActions, {
    tagName: "",
    classNames: [],
    general_error: undefined,
    endpoint: Ember.computed("module.id", function() {
        return "/modules/" + this.get("module.id") + "/submit";
    }),
    valid: false,
    files: undefined,
    actions: {
        file_list: function(files) {
            this.set("files", files);
            this.set("valid", !Ember.isEmpty(files));
        },
        select_files: function() {
            Ember.$("#upload_" + this.get("module.id")).trigger('click');
        },
        submit: function() {
            this.set("general_error", undefined);
            if(this.get("valid")) {
                this.get("f_input").send("upload");
            } else {
                this.set("general_error", "Nejsou vybrány žádné soubory!");
            }
        },
        upload_finished: function() {
            this.set("module.state", "correct");
            this.sendAction("submit_done");
        },
        upload_failed: function(text, err) {
            this.set("general_error", text + ": " + err);
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