import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  modelNameFromPayloadKey: function(payloadKey) {
    if (payloadKey === 'waves') {
      return "wave";
    } else {
     return this._super(payloadKey);
    }
  },
  isNewSerializerAPI: true
});
