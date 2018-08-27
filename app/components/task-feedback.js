import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
    session: Ember.inject.service(),
    store: Ember.inject.service(),

    didRender: function() {
        this._super();
        var self = this;
        var $ = Ember.$;
        if (Ember.$("[id^=task-feedback-answer-]").length === 0){
            return;
        }
        self.displayStars();
        let starsFields = $(".task-feedback-stars-field");
        for (let i = 0; i < starsFields.length; i++){
            let firstStar = $(starsFields[i]).siblings("ul").first().find("li").first();
            let val = $(starsFields[i]).val();
            if (val !== ""){
                self.highlightStars(firstStar, val);
            }
        }
    },

    // trouble with sliders
    // https://github.com/seiyria/angular-bootstrap-slider/issues/57
    // https://github.com/seiyria/bootstrap-slider/issues/250

    highlightStars: function(singleStar, val){
        let $ = Ember.$;
        var stars = $(singleStar).parent().children('li.star');
            
        for (let i = 0; i < stars.length; i++) {
          $(stars[i]).removeClass('star-selected');
        }
        
        for (let i = 0; i < val; i++) {
          $(stars[i]).addClass('star-selected');
        }
        
        var ratingValue = parseInt($('#stars li.star-selected').last().data('value'), 10);
        $(singleStar).parent().siblings("input").val(ratingValue);
    },
     
    displayStars: function(){ // https://codepen.io/depy/pen/vEWWdw?editors=1000
        let $ = Ember.$;
        var self = this;
        /* 1. Visualizing things on Hover - See next part for action on click */
          $('#stars li').on('mouseover', function(){
            var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on
           
            // Now highlight all the stars that's not after the current hovered star
            $(this).parent().children('li.star').each(function(e){
              if (e < onStar) {
                $(this).addClass('hover');
              }
              else {
                $(this).removeClass('hover');
              }
            });
            
          }).on('mouseout', function(){
            $(this).parent().children('li.star').each(function(){
              $(this).removeClass('hover');
            });
          });
          
          
          /* 2. Action to perform on click */
          $('#stars li').on('click', function(){
            var onStar = parseInt($(this).data('value'), 10); // The star currently selected
            
            self.highlightStars($(this), onStar);
          });
    }, 


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
                    self.set("save_status", "Díky!");
                },
                error: function(resp) {
                    var e = "Tvůj feedback se bohužel nepodařilo odeslat.<br>" + resp.message;
                    if ((resp.errors) && (resp.errors[0])) { e += "<br>" + resp.errors[0].status  + " : " + resp.errors[0].title; }
                    self.set("feedback_error", e);
                }
            });
        });
    },

    statemsg: "Uloženo",
    actions: {
        saveTaskFeedback: function() {
            this.save();
        },
        sliderChanged: function(value, options) {
            Ember.$(options.evt.currentTarget).parent().siblings("input").val(value);
        },
    },
});
