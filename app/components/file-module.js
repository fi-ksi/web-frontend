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
    show_error: false,
    /* TODO
    show_message: false,
    script_message_output: undefined,
    script_message_mode: "info",
    */

    actions: {
        file_list: function(files) {
            this.set("files", files);
            this.set("valid", !Ember.isEmpty(files));
        },
        select_files: function() {
            Ember.$("#upload_" + this.get("module.id")).trigger('click');
        },
        submit: function() {
//            this.set("script_message_output", null);
            if(this.get("valid")) {
                this.set("general_error", "");
                this.set("progress_msg", "Nahrávám...");
                this.get("f_input").send("upload");
            } else {
                this.set("progress_msg", "");
                this.set("general_error", "Nejsou vybrány žádné soubory!");
                this.set("show_error", true);
                this.sendAction("submit_done");
            }
        },
        upload_finished: function() {
            var self = this;
            this.set("progress_msg", "");
            this.set("module.state", "correct");
            this.get("module").reload().then(function() {
                self.set("files", undefined);
            });
            this.sendAction("submit_succ_done");
        },
        upload_failed: function(text, err) {
            this.set("progress_msg", "");
            this.set("general_error", text + ": " + err);
            this.sendAction("submit_done");
        },
        progress: function(progress) {
            this.set("progress_msg", "Nahrávám – " + Math.floor(progress) + " %");
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
});
