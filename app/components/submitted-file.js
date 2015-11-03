import Ember from "ember";
import config from '../config/environment';

export default Ember.Component.extend({
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
            Ember.$.ajax({
                url: this.get("file.filepath"),
                data: JSON.stringify({}),
                contentType: "application/json",
                type: 'DELETE',
                success: function(data) {
                    if(result['status'] == "ok") {
                        send("del", this.get("file.id"))
                    }
                },
                error: function() {
                    self.set("active", true);
                }
            });
        }
    }
});