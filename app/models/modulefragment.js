import DS from 'ember-data';
import MF from 'model-fragments';

export default MF.Fragment.extend({
  evaluation: MF.fragment("evaluation"),
  module_id: DS.attr("number"),
  evaluations_list: DS.attr("evals-list")
});
