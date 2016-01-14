/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ksi',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
    },

    contentSecurityPolicy: {
        'default-src': "http://static.addtoany.com/menu/ https://static.addtoany.com/menu/",
        'script-src':  "'self' http://cdnjs.cloudflare.com/ajax/ https://cdn.mathjax.org/ http://www.google-analytics.com/analytics.js  http://static.addtoany.com/menu/ https://static.addtoany.com/menu/ 'unsafe-inline' 'unsafe-eval'",
        'font-src':    "*",
        'connect-src': "'self'",
        'img-src':     "* data:",
        'style-src':   "* 'unsafe-inline'",
        'media-src':   "'self'"
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV["simple-auth"] = {
        authorizer: 'simple-auth-authorizer:oauth2-bearer',
        store: 'simple-auth-session-store:local-storage',
        crossOriginWhitelist: [
          'http://localhost:3000',
          'https://localhost:3000',
          'http://kyzikos.fi.muni.cz:3000',
          'https://kyzikos.fi.muni.cz:3000',
          'https://ksi.fi.muni.cz',
          'http://ksi.fi.muni.cz',
          'https://ksi.fi.muni.cz:3000',
          'http://ksi.fi.muni.cz:3000']
      }

  if (environment === 'local_dev' || environment === 'mockup_dev') {
    ENV['simple-auth-oauth2'] = {
      serverTokenEndpoint: 'http://localhost:3000/auth'
    };
    ENV["API_LOC"] = "http://localhost:3000";
  }

  if (environment === 'remote_dev') {
    ENV['simple-auth-oauth2'] = {
      serverTokenEndpoint: 'https://kyzikos.fi.muni.cz:3000/auth'
    };
    ENV["API_LOC"] = "https://kyzikos.fi.muni.cz:3000";
    ENV["contentSecurityPolicy"]["connect-src"] += " https://kyzikos.fi.muni.cz:3000"
    ENV["contentSecurityPolicy"]["script-src"] += " http://localhost:49152" // livereload
    ENV["contentSecurityPolicy"]["script-src"] += " http://0.0.0.0:49152" // livereload
  }

  if (environment === 'prod_dev') {
    ENV['simple-auth-oauth2'] = {
      serverTokenEndpoint: 'https://ksi.fi.muni.cz:3000/auth'
    };
    ENV["API_LOC"] = "https://ksi.fi.muni.cz:3000";
  }

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV["API_LOC"] = "https://ksi.fi.muni.cz:3000";
    ENV['simple-auth-oauth2'] = {
      serverTokenEndpoint: 'https://ksi.fi.muni.cz:3000/auth'
    }
  }

  ENV.i18n = {
    defaultLocale: 'cs'
  };

  return ENV;
};
