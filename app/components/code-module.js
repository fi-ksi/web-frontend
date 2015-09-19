import Ember from "ember";

export default Ember.Component.extend({
    tagName: "",
    classNames: [],
    didInsertElement: function() {
        this._super();
        Ember.run.scheduleOnce("afterRender", this, function(){
            var self = this;
            Ember.$("#load_input_" + this.get("id")).change(function(evt) {
                var f = evt.target.files[0];

                if(f.name.split(".").pop() !== "py") {
                    alert("Vybrán nepodporovaný typ souboru!");
                    return;
                }

                if(f) {
                    var r = new FileReader();
                    r.onload = function(e) {
                        self.get_editor().setValue(e.target.result);
                    };
                    r.readAsText(f);
                } else {
                    alert("Nepodařilo se načíst soubor!");
                }
            });
        }); 
    },
    module_service: Ember.inject.service("module-service"),
    manage_submit: Ember.on("init", function() {
        this.get("module_service").on("submit", () => {
            this.set("general_error", undefined);
            var content = this.get_editor().getValue();
            if(content && content !== this.get("module.default_code")) {
                this.sendAction("result", "module_" + this.get("module").id, {code: content});
            } else {
                this.sendAction("error", "module_" + this.get("module").id);
                if(content == this.get("module.default_code")) {
                    this.set("general_error", "Neprovedl jsi žádné změny na kódu");
                } else {
                    this.set("general_error", "Nelze odevzdat prázdný kód!");
                }
            }
        });
    }),
    release_submit: Ember.on('willDestroyElement', function () {
        this.get('module_service').off('submit', this);
    }),
    get_editor: function() {
        return window.ace.edit("editor_module_" + this.get("id"));
    },
    actions: {
        toggle_info: function() {
            this.set("show_info", !this.get("show_info"));
            if(this.get("show_info")) {
                this.set("info_button_text", "Skrýt nápovědu");
            } else {
                this.set("info_button_text", "Zobrazit nápovědu");
            }
        },
        reset: function() {
            if(confirm("Opravdu obnovit výchozí kód? Tvůj současný kód bude smazán!")) {
                var editor = this.get_editor();
                editor.setValue(this.get("module.default_code"));
            }
        },
        run: function() {
            // ToDo: Depends on backend
        },
        load: function() {
            Ember.$("#load_input_" + this.get("id")).trigger('click');
        },
        save: function() {
            var blob = new Blob([this.get_editor().getValue()], {type: "text/plain;charset=utf-8"});
            saveAs(blob, "source.py");
        }
    },
    script_text_output: "abcd",
    script_graphics_output: undefined,
    general_error: undefined,
    info_button_text: "Zobrazit nápovědu",
    show_info: false
});