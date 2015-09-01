/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var pickFiles = require('broccoli-static-compiler');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  app.import(app.bowerDirectory + '/bootstrap/dist/js/bootstrap.js');
  app.import(app.bowerDirectory + '/bootstrap/dist/css/bootstrap.css');

  app.import(app.bowerDirectory + '/cytoscape/dist/cytoscape.min.js');
  app.import(app.bowerDirectory + '/cytoscape-cxtmenu/cytoscape-cxtmenu.js');
  app.import(app.bowerDirectory + '/ember-qtip2/jquery.qtip.min.js');
  app.import(app.bowerDirectory + '/cytoscape-qtip/cytoscape-qtip.js');
  app.import(app.bowerDirectory + '/ace-builds/src-min-noconflict/ace.js');
  app.import(app.bowerDirectory + '/HCaptions/jquery.hcaptions.js');

  app.import(app.bowerDirectory + '/ember-qtip2/jquery.qtip.min.css');

  // import the main file
  app.import('bower_components/tinymce/tinymce.min.js', {destDir: 'assets/tinymce'});

  // import the jquery integration file
  app.import('bower_components/tinymce/jquery.tinymce.min.js', {destDir: 'assets/tinymce'});

  app.import(app.bowerDirectory + '/moment/locale/cs.js');
  // import all the assets (technically you could be more precise in picking just the plugins and themes that you require, but for brevity's sake this will work)
  var tinymceAssets = pickFiles('bower_components/tinymce/', {
    srcDir: '/',
    files: ['**/*.min.js', '**/*.min.css', '**/*.woff', '**/*.ttf'],
    destDir: '/tinymce'
  });

  return app.toTree([tinymceAssets]);
};
