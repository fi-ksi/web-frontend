export default Ember.TextField.extend(Ember.Evented, {
  type: 'file',
  attributeBindings: ['multiple'],
  multiple: false,
  change: function(e) {
    var input = e.target;
    this.sendAction("file_change", input.files);
  }
});