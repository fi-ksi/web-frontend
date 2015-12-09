import DS from 'ember-data';
import MF from 'model-fragments';

export default MF.Fragment.extend({
  evaluation: MF.fragment("evaluationfragment"),
  module_id: DS.attr("number")
});
