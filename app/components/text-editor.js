// app/components/text-editor.js

import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['text-editor'],

  _options: {
    skin_url: '/tinymce/skins/lightgray',
    theme_url: '/tinymce/themes/modern/theme.min.js',
    external_plugins: {
      image: '/tinymce/plugins/image/plugin.min.js',
      link: '/tinymce/plugins/link/plugin.min.js',
      table: '/tinymce/plugins/table/plugin.min.js',
      advlist: '/tinymce/plugins/advlist/plugin.min.js',
      autolink: '/tinymce/plugins/autolink/plugin.min.js',
      lists: '/tinymce/plugins/lists/plugin.min.js',
      charmap: '/tinymce/plugins/charmap/plugin.min.js',
      print: '/tinymce/plugins/print/plugin.min.js',
      preview: '/tinymce/plugins/preview/plugin.min.js',
      anchor: '/tinymce/plugins/anchor/plugin.min.js',
      searchreplace: '/tinymce/plugins/searchreplace/plugin.min.js',
      visualblocks: '/tinymce/plugins/visualblocks/plugin.min.js',
      code: '/tinymce/plugins/code/plugin.min.js',
      fullscreen: '/tinymce/plugins/fullscreen/plugin.min.js',
      insertdatetime: '/tinymce/plugins/insertdatetime/plugin.min.js',
      media: '/tinymce/plugins/media/plugin.min.js',
      contextmenu: '/tinymce/plugins/contextmenu/plugin.min.js',
      paste: '/tinymce/plugins/paste/plugin.min.js'
    },
    menubar: false,
    toolbar: "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code"
  },

  didInsertElement: function() {
    var component = this;
    var options = this.get('_options');

    Ember.merge(options, {
      setup: function(editor) {
        // bind change event
        component.set('editor', editor);
        editor.on('change', function() {
          component.set('value',
             editor.getContent());
        });
      }
    });

    this.$('textarea').tinymce(options);
  }.on('didInsertElement'),

  valueChanged: function () {
    tinymce.editors.filter(function (editor) {
      if (typeof this === "undefined") {
        return;
      }
      return editor.id === this.get('editor').id;
    }).forEach(function (editor) {
      editor.setContent(this.get('value'));
    });
  }.observes('value')
});
