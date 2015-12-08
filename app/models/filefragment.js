import DS from 'ember-data';
import MF from 'model-fragments';
import Ember from "ember";
import config from '../config/environment';

export default MF.Fragment.extend({
  filename: DS.attr("string")
});
