import Ember from "ember";
import InboundActions from 'ember-component-inbound-actions/inbound-actions';
import config from '../config/environment';
import moment from 'moment';

export default Ember.Component.extend(InboundActions, {
    session: Ember.inject.service(),
    tagName: "",
    classNames: [],

    running: false,
    submitting: false,
    show_error: false,
    show_message: false,

    script_text_output: undefined,
    script_message_output: undefined,
    script_message_mode: "danger",
    script_graphics_output: undefined,
    general_error: undefined,
    info_button_text: "Zobrazit nápovědu k editoru kódu",
    show_info: false,
    show_load_info: true,

    didInsertElement: function() {
        this._super();
        Ember.run.scheduleOnce("afterRender", this, function(){
            var self = this;

            // F5 to run code
            Ember.$(document).on("keydown", function(e) {
                if ((e.which || e.keyCode) === 116) {
                    if (Ember.$('.code_editor').length) {
                        e.preventDefault();
                        if (!self.get("running") && !self.get("submitting")){
                            self.send("run");
                        }
                    }
                }
            });

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
            this.set("general_error", "");
            this.set("script_text_output", null);
            this.set("script_message_output", null);
            this.set("module.show_report", false);
            this.set("script_graphics_output", null);
            this.set("show_load_info", false);
            var content = this.get_editor().getValue();
            this.set("submitting", true);

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
                        if ("result" in data) {
                            self.set("script_message_mode", "danger");
                            self.set("module.blockClosing", false);
                            if (data.result === "error") {
                                self.set("module.show_report", true);
                                if ("error" in data) {
                                    self.set("general_error", data.error);
                                } else {
                                    if ( !("message" in data && data.message.trim() !== "") ) {
                                        self.set("general_error", "Nastala chyba při vykonávání kódu, kontaktuj organizátora.");
                                    }
                                }
                            } else if(data.result === "nok") {
                                if (self.get("module.state") !== "correct"){
                                    self.set("module.state", "incorrect");
                                }
                                if ( !("message" in data && data.message.trim() !== "") ) {
                                    self.set("script_message_output", "Tvé řešení není správné! Zkus to znovu.");
                                }
                            } else if(data.result === "ok") {
                                self.set("script_message_mode", "success");
                                self.set("module.state", "correct");
                                if ("message" in data && data.message.trim() !== "") {
                                    self.set("module.blockClosing", true);
                                }
                                self.sendAction("submit_succ_done");
                            }
                            if (data.score !== undefined) {
                                if(!self.get("module.score")) {
                                    self.set("module.score", self.get("store").createRecord("module-score"));
                                }
                                self.set("module.score.score", data.score);
                            }
                        } else {
                            self.set("general_error", "Server neposlal result, kontaktuj organizátora.");
                        }
                        if ("stdout" in data) {
                            self.set("script_text_output", data.stdout.trim());
                        }
                        if ("message" in data && data.message.trim() !== "") {
                            self.set("script_message_output", data.message.trim());
                        }
                        if ("report" in data && data.report.trim() !== "") {
                            self.set("module.report_output", data.report.trim());
                        }
                        if ("result" in data && data.result !== "ok"){
                            if ("next" in data) {
                                self.set("script_message_output", self.get("script_message_output") + "<br>" +
                                    "Další odevzdání možné " + (moment.utc(data.next)).local().format('LLL') + ".");
                            } else {
                                self.set("script_message_output", self.get("script_message_output") + "<br>" +
                                    "Další odevzdání možné ihned.");
                            }
                        }
                        self.set("submitting", false);
                        self.sendAction("submit_done");
                    },
                    error: function() {
                        self.set("general_error", "Server odpověděl chybovým kódem, kontaktuj organizátora.");
                        self.set("submitting", false);
                        self.sendAction("submit_done");
                    }
                });
            });
        },

        toggle_info: function() {
            this.set("show_info", !this.get("show_info"));
            if(this.get("show_info")) {
                this.set("info_button_text", "Skrýt nápovědu");
            } else {
                this.set("info_button_text", "Zobrazit nápovědu k editoru kódu");
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
            this.set("general_error", "");
            this.set("running", true);
            var content = this.get_editor().getValue();
            this.set("script_text_output", null);
            this.set("script_message_output", null);
            this.set("script_graphics_output", null);
            this.set("show_load_info", false);
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
                        if("stdout" in data ||  "image_output" in data || "result" in data || "message" in data || "report" in data) {
                            if("stdout" in data && data.stdout) {
                                self.set("script_text_output", data.stdout.trim());
                            }
                            if("image_output" in data && data.image_output) {
                                self.set("script_graphics_output", config.API_LOC + data.image_output);
                            }
                            if("message" in data && data.message) {
                                self.set("script_message_output", data.message.trim());
                                if("result" in data && data.result) {
                                    if (data.result === "ok") {
                                        self.set("script_message_mode", "success");
                                    }else{
                                        self.set("script_message_mode", "danger");
                                    }
                                }
                            }
                            if ("report" in data && data.report.trim() !== "") {
                                self.set("module.report_output", data.report.trim());
                            }
                        }
                        else {
                            self.set("script_graphics_output", null);
                            self.set("script_text_output", null);
                            self.set("script_message_output", null);
                            self.set("general_error", "Špatná odpověď serveru");
                        }
                        self.set("running", false);
                    },
                    error: function() {
                        self.set("running", false);
                        self.set("general_error", "Špatná odpověď ze serveru. Zkus to za chvíli znovu. Pokud problém přetrvá, kontaktuj organizátora.");
                    }
                });
            });
        },
        load: function() {
            Ember.$("#load_input_" + this.get("module.id")).trigger('click');
        },
        save: function() {
            var blob = new Blob([this.get_editor().getValue()], {type: "text/plain;charset=utf-8"});
            saveAs(blob, "source.py");
        }
    },

});
