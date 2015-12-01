import DS from 'ember-data';
import MF from 'model-fragments';

export default MF.Fragment.extend({
  module_id: DS.belongsTo("module"),
  evaluation: MF.fragment("evaluationfragment")
});
