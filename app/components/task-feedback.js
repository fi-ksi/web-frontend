import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
    session: Ember.inject.service(),
    store: Ember.inject.service(),

    save: function() {
        var self = this;
        this.set("statemsg", "Ukládám");
        var data_obj  = JSON.stringify(this.get("model.feedbacks"), null, 2);
        var data_json = JSON.parse(data_obj);
        var categories = data_json["content"]["categories"];
        for (var i = 0; i < categories.length; i++) {
            const element_name = data_json["content"]["categories"][i]["id"];
            let answer = Ember.$("#task-feedback-answer-"+element_name).val();
            let ftype = data_json["content"]["categories"][i]["ftype"];
            if (ftype === "stars" || ftype === "line"){
                if (answer === ""){
                    answer = 0;
                }else{
                    answer = parseInt(answer);
                }
            }
            data_json["content"]["categories"][i]["answer"] = answer;
        }
        data_json["content"]["filled"] = true;
        data_json["content"]["id"] = self.get("model").id;

        data_json["feedback"] = data_json["content"];
        delete data_json["isFulfilled"];
        delete data_json["content"];
        var data_json_string  = JSON.stringify(data_json, null, 2);
        this.get('session').authorize('authorizer:oauth2', function(header, h) {
            Ember.$.ajax({
                url: config.API_LOC + "/feedbacks/"+self.get("model").id,
                data: data_json_string,
                contentType: "application/json",
                type: 'PUT',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader(header, h);
                },
                success: function() {
                },
                error: function(resp) {
                    self.set("feedback_sending", false);
                    var e = "Už ani nahlásit chybu nejde, za to beztak může Los Karlos! Napiš nám na ksi@fi.muni.cz.<br>" + resp.message;
                    if ((resp.errors) && (resp.errors[0])) { e += "<br>" + resp.errors[0].status  + " : " + resp.errors[0].title; }
                    self.set("feedback_error", e);
                }
            });
        });
    },

    statemsg: "Uloženo",
    actions: {
        saveTest: function() {
            this.save();
        },
    },
});
