import DS from 'ember-data';
import MF from 'model-fragments';

export default MF.Fragment.extend({
  // MF does not support belongsTo relationship
  corrected_by: DS.attr("string"),  // id must ne string (because of x-select)
  full_report: DS.attr("string"),
  last_modified: DS.attr("date"),
  points: DS.attr("number"),
  eval_id: DS.attr("number"),

  general: MF.fragment("generalfragment"),
  programming: MF.fragment("programmingfragment"),
  quiz: MF.fragment("quizfragment"),
  sortable: MF.fragment("sortablefragment"),
  text: MF.fragment("textfragment"),
});
