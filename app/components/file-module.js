import Ember from "ember";
import InboundActions from 'ember-component-inbound-actions/inbound-actions';

export default Ember.Component.extend(InboundActions, {
    tagName: "",
    session: Ember.inject.service(),
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
            this.set("in_progress", true);
            this.set("progress_msg", "Nahrávám");
            if(this.get("valid")) {
                this.get("f_input").send("upload");
            } else {
                this.set("general_error", "Nejsou vybrány žádné soubory!");
            }
        },
        upload_finished: function() {
            var self = this;
            this.set("module.state", "correct");
            this.set("in_progress", false);
            this.get("module").reload().then(function() {
                self.set("files", undefined);
            });
            this.sendAction("submit_done");
        },
        upload_failed: function(text, err) {
            this.set("in_progress", false);
            this.set("general_error", text + ": " + err);
        },
        progress: function(progress) {
            this.set("progress_msg", "Nahrávám - " + Math.floor(progress) + " %");  
        },
        delete_file: function(id) {
            this.set("module.submitted_files.files", this.get("module.submitted_files.files").filter(function(x) {
                return x['id'] !== id;
            }));
            if (this.get("module.submitted_files.files.length") === 0) {
                this.set("module.state", "blank");
            }
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
