import DS from 'ember-data';
import MF from 'model-fragments';

export default MF.Fragment.extend({
  corrected_by: DS.belongsTo("user"),
  full_report: DS.attr("string"),
  last_modified: DS.attr("date"),
  points: DS.attr("number"),
  general: MF.fragment("generalfragment")
});
