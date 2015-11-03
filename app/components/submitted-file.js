import Ember from "ember";

export default Ember.Component.extend({
    session: Ember.inject.service('session'),
    tagName: "",
    classNames: [],
    didInsertElement: function() {
        this._super();
        this.set("active", true);
        Ember.run.scheduleOnce("afterRender", this, function(){
            
        }); 
    },
    actions: {
        del: function() {
            if (!this.get("active")) {
                return;
            }
            this.set("active", false);
            var self = this;
            console.log(this.get('session'));
            this.get('session').authorize('authorizer:oauth2-bearer', function(header, content) {
                alert("Here!");
                Ember.$.ajax({
                    url: self.get("file.filepath"),
                    data: JSON.stringify({}),
                    contentType: "application/json",
                    headers: {
                        header: content
                    },
                    type: 'DELETE',
                    success: function(data) {
                        if(data['status'] === "ok") {
                            self.send("del", self.get("file.id"));
                        }
                    },
                    error: function() {
                        self.set("active", true);
                    }
                });
            });
        }
    }
});