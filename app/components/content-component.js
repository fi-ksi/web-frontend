import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    session: Ember.inject.service(),

    // content should be passed as argument to component
    model: null,

    // type could be 'list' or 'gallery'; 'list' is default
    type: null,

    // files to upload
    to_upload: [],

    // selected is absolute path
    selected: null,
    selectable: null,

    type_list: Ember.computed("type", function() { return (this.get("type") === 'list') || (this.get("type") === null); }),
    type_gallery: Ember.computed("type", function() { return this.get("type") === 'gallery'; }),

    endpoint: Ember.computed("model.id", function() {
        // endpoint must end with "/"
        return config.API_LOC + ("/content/" + this.get("model.id") + "/").replace("//", "/");
    }),

    upload_endpoint: Ember.computed("model.id", function() {
        // endpoint must NOT end with "/"
        return ("/content/" + this.get("model.id")).replace("//", "/");
    }),

    files: Ember.computed("model.files", "selected", function(){
        if (!this.get("model.files")) { return []; }
        var sel = this.get("selected");
        if (sel) { sel = sel.split("/").get("lastObject"); }
        return this.get("model.files").map(function(file) {
            return Ember.Object.create({
                'file': file,
                'selected': (file === sel),
            });
        });
    }),

    actions: {
        'select': function(file) {
            var _new = this.get('endpoint') + file.get('file');
            this.set('selected', _new);
            this.sendAction("on_select", _new);
        },
        'file_list': function(to_upload) {
            this.set("to_upload", to_upload);
            this.set("valid", !Ember.isEmpty(to_upload));
        },
        'select_files': function() {
            Ember.$("#c-upload_" + this.get("model.id").replace("/", "\\/")).trigger('click');
        },
        'submit': function() {
            this.set("general_error", undefined);
            this.set("in_progress", true);
            this.set("progress_msg", "Nahrávám");
            if(this.get("valid")) {
                this.get("f_input").send("upload");
            } else {
                this.set("general_error", "Nejsou vybrány žádné soubory!");
            }
        },
        'upload_finished': function() {
            var self = this;
            this.set("in_progress", false);
            this.get("store").find("content", this.get("model.id")).then(function(c) {
                c.reload();
                self.set("model", c);
                self.set("to_upload", []);
            });
        },
        'upload_failed': function(text, err) {
            this.set("in_progress", false);
            this.set("general_error", text + ": " + err);
        },
        'progress': function(progress) {
            this.set("progress_msg", "Nahrávám – " + Math.floor(progress) + " %");  
        },
        'delete_file': function(file) {
            var self = this;

            if(!confirm("Opravdu odstranit soubor " + file.get("file") + "?")) {
                return;
            }

            file.set("deleting", true);

            this.get('session').authorize('authorizer:oauth2', function(header, h) {
                Ember.$.ajax({
                    url: self.get("endpoint") + file.get("file"),
                    type: 'DELETE',
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader(header, h);
                    },
                    success: function() {
                        file.set("deleting", false);
                        self.get("store").find("content", self.get("model.id")).then(function(c) {
                            c.reload();
                            self.set("model", c);
                        });
                    },
                    error: function() {
                        file.set("deleting", false);
                        alert("Chyba backendu, kontaktuj administrátora!");
                    }
                });
            });
        },

        'copy-to-clipboard': function(file) {
            window.prompt("Stiskni Ctrl+C, Enter", this.get("endpoint") + file.get("file"));
        },

    }
});
