import AdminAdapterMixin from '../mixins/admin-adapter';
import Ember from 'ember';

export default AdminAdapterMixin;

// Hack for singleton
var inflector = Ember.Inflector.inflector;
inflector.irregular('wave', 'waves');