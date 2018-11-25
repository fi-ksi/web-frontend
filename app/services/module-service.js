import Ember from "ember";

export default Ember.Service.extend(Ember.Evented, {  
    emit_submit(id) {
        this.trigger('submit', id);
    }
});