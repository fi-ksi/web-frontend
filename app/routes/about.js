import Ember from "ember";

export default Ember.Route.extend({
    beforeModel: function(param) {
        this._super();
        if("queryParams" in param && "view" in param.queryParams && param.queryParams.view === "faq") {
            Ember.$("#faq").livequery(function() {
                Ember.$('html, body').animate({
                    scrollTop: Ember.$("#faq").offset().top - 150 //Magic constant
                }, "slow");
            });
        }
        else {
            Ember.$("#faq").expire();
            Ember.$("html, body").animate({ scrollTop: 0 }, "slow");
        }
    },
    queryParams: {
        view: {
            refreshModel: true,
            replace: true,
            as: "view"
        }
    },
    view: null,
    title: "O KSI"
});
