import Ember from "ember";

export default Ember.Service.extend(Ember.Evented, {  
    emit_submit() {
        this.trigger('submit');
    }
});