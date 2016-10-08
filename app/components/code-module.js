import Ember from "ember";
import InboundActions from 'ember-component-inbound-actions/inbound-actions';
import config from '../config/environment';

export default Ember.Component.extend(InboundActions, {
    session: Ember.inject.service(),
    tagName: "",
    classNames: [],
    mathObserver: Ember.computed("module", function() {
        MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    }),
    didInsertElement: function() {
        this._super();
        Ember.run.scheduleOnce("afterRender", this, function(){
            var self = this;
            Ember.$("#load_input_" + this.get("module.id")).change(function(evt) {
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
    get_editor: function() {
        return window.ace.edit("editor_module_" + this.get("module.id"));
    },
    actions: {
        submit: function() {
            var self = this;
            this.set("general_error", undefined);
            self.set("script_text_output", null);
            self.set("script_graphics_output", null);
            self.set("submission_info", null);
            var content = this.get_editor().getValue();
            if(content && content !== this.get("module.default_code")) {
                self.set("general_info", "Odevzdávám");
                this.get('session').authorize('authorizer:oauth2', function(header, h) {
                    Ember.$.ajax({
                        url: config.API_LOC + "/modules/" + self.get("module.id") + "/submit",
                        data: JSON.stringify({ content: content }),
                        contentType: "application/json",
                        type: 'POST',
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader(header, h);
                        },
                        success: function(data) {
                            self.set("general_info", null);
                            if("result" in data) {
                                self.set("module.state", data.result);
                                if(data.result === "error") {
                                    self.set("general_error", "Nastala chyba při vykonávání kódu, kontaktuj organizátora.");
                                } else if(data.result === "exec-error") {
                                    self.set("general_error", "Nastala chyba při vykonávání kódu, zkontroluj si syntaxi.");
                                } else if(data.result === "incorrect") {
                                    self.set("general_error", "Tvé řešení není správné! Zkus to znovu.");
                                } else if(data.result === "correct") {
                                    self.sendAction("submit_succ_done");
                                }
                                if (data.score !== undefined) {
                                    if(!self.get("module.score")) {
                                        self.set("module.score", self.get("store").createRecord("module-score"));
                                    }
                                    self.set("module.score.score", data.score);
                                }
                            } else {
                                self.set("general_error", "Špatná odpověď serveru");
                            }
                            if ("output" in data) {
                                self.set("script_text_output", data.output.trim());
                            }
                        },
                        error: function() {
                            self.set("submission_info", "Špatná odpověď ze serveru. Zkus to za chvíli znovu. Pokud problém přetrvává, kontaktuj organizátora.");
                        }
                    });
                });
            } else {
                if(content === this.get("module.default_code")) {
                    this.set("general_error", "Neprovedl jsi žádné změny na kódu");
                } else {
                    this.set("general_error", "Nelze odevzdat prázdný kód!");
                }
            }
        },
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
            var self = this;
            this.set("general_error", null);
            self.set("submission_info", null);
            this.set("general_info", null);
            var content = this.get_editor().getValue();
            if(content/* && content !== this.get("module.default_code")*/) {
                self.set("general_info", "Vyhodnocuji kód");
                self.set("script_text_output", null);
                self.set("script_graphics_output", null);
                this.get_editor().focus();
                this.get('session').authorize('authorizer:oauth2', function(header, h) {
                    Ember.$.ajax({
                        url: config.API_LOC + "/runCode/" + self.get("module.id") + "/submit",
                        data: JSON.stringify({ content: content }),
                        contentType: "application/json",
                        type: 'POST',
                        beforeSend: function(xhr) {
                            xhr.setRequestHeader(header, h);
                        },
                        success: function(data) {
                            if("output" in data ||  "image_output" in data) {
                                if("output" in data && data.output) {
                                    self.set("script_text_output", data.output.trim());
                                }
                                if("image_output" in data && data.image_output) {
                                    self.set("script_graphics_output", config.API_LOC + data.image_output);
                                }
                            }
                            else {
                                self.set("script_graphics_output", null);
                                self.set("script_text_output", null);
                                self.set("general_error", "Špatná odpověď serveru");
                            }
                            self.set("general_info", null);
                        },
                        error: function() {
                            self.set("general_info", null);
                            self.set("general_error", "Špatná odpověď ze serveru. Zkus to za chvíli znovu. Pokud problém přetrvává, kontaktuj organizátora.");
                        }
                    });
                });
            } else {
                if(content === this.get("module.default_code")) {
                    this.set("general_error", "Neprovedl jsi žádné změny na kódu");
                } else {
                    this.set("general_error", "Nelze odevzdat prázdný kód!");
                }
            }
        },
        load: function() {
            Ember.$("#load_input_" + this.get("module.id")).trigger('click');
        },
        save: function() {
            var blob = new Blob([this.get_editor().getValue()], {type: "text/plain;charset=utf-8"});
            saveAs(blob, "source.py");
        }
    },
    script_text_output: undefined,
    script_graphics_output: undefined,
    general_error: undefined,
    general_info: undefined,
    info_button_text: "Zobrazit nápovědu",
    show_info: false
});
