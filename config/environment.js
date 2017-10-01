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

    /* google uses images for analytics
       mathjax uses images for fonts
       ace editor uses base64-encoded images
     */
    contentSecurityPolicy: {
        'default-src': "'self'",
        'connect-src': "cdnjs.cloudflare.com",
        'script-src':  "'self' cdnjs.cloudflare.com www.google-analytics.com",
        'style-src':   "'self' 'unsafe-inline' maxcdn.bootstrapcdn.com",
        'img-src':     "'self' www.google-analytics.com cdnjs.cloudflare.com data:",
        'font-src':    "'self' maxcdn.bootstrapcdn.com cdnjs.cloudflare.com",
        'child-src':   "youtube.com www.youtube.com"
    },

    contentSecurityPolicyHeader: "Content-Security-Policy",

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
    ENV["contentSecurityPolicy"]["default-src"] += " https://kyzikos.fi.muni.cz:3000"
    ENV["contentSecurityPolicy"]["connect-src"] += " https://kyzikos.fi.muni.cz:3000"
    ENV["contentSecurityPolicy"]["script-src"] += " 127.0.0.1" // livereload
    ENV["contentSecurityPolicy"]["report-uri"] = "https://ksi.report-uri.io/r/default/csp/enforce"
    ENV["contentSecurityPolicy"]["img-src"] += " https://kyzikos.fi.muni.cz:3000"
  }

  if (environment === 'prod_dev') {
    ENV['simple-auth-oauth2'] = {
      serverTokenEndpoint: 'https://ksi.fi.muni.cz:3000/auth'
    };
    ENV["API_LOC"] = "https://ksi.fi.muni.cz:3000";
    ENV["contentSecurityPolicy"]["default-src"] += " https://ksi.fi.muni.cz:3000"
    ENV["contentSecurityPolicy"]["connect-src"] += " https://ksi.fi.muni.cz:3000"
    ENV["contentSecurityPolicy"]["script-src"] += " 127.0.0.1" // livereload
    ENV["contentSecurityPolicy"]["report-uri"] = "https://ksi.report-uri.io/r/default/csp/enforce"
    ENV["contentSecurityPolicy"]["img-src"] += " https://ksi.fi.muni.cz:3000"
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

    // Warning: you need to deploy these CSP policies manually to Apache
    // server. "ember csp-headers --environment production" command
    // could help you.

    ENV["contentSecurityPolicy"]["default-src"] += " https://ksi.fi.muni.cz:3000"
    ENV["contentSecurityPolicy"]["connect-src"] += " https://ksi.fi.muni.cz:3000"
    ENV["contentSecurityPolicy"]["report-uri"] = "https://ksi.report-uri.io/r/default/csp/enforce"
    ENV["contentSecurityPolicy"]["img-src"] += " https://ksi.fi.muni.cz:3000"
  }

  ENV.i18n = {
    defaultLocale: 'cs'
  };

  return ENV;
};
