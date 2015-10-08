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
    contentSecurityPolicy: {
        'default-src': "'none'",
        'script-src': "'self'",
        'font-src': "'self'",
        'connect-src': "'self' *",
        'img-src': "'self'",
        'style-src': "'self' *",
        'media-src': "'self'"
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  ENV["API_LOC"] = "http://ec2-52-10-225-244.us-west-2.compute.amazonaws.com:9128";

  ENV["simple-auth"] = {
        authorizer: 'simple-auth-authorizer:oauth2-bearer',
        store: 'simple-auth-session-store:local-storage',
        crossOriginWhitelist: ['http://localhost:3000',
          'http://http://ec2-52-10-225-244.us-west-2.compute.amazonaws.com:9128/',
          'http://147.251.43.191:3000']
      }

  ENV['simple-auth-oauth2'] = {
    serverTokenEndpoint: 'http://ec2-52-10-225-244.us-west-2.compute.amazonaws.com:9128/v1/oauth2/auth'
  };

  if (environment === 'local_dev' || environment === 'mockup_dev') {
    ENV['simple-auth-oauth2'] = {
      serverTokenEndpoint: 'http://localhost:3000/auth'
    };
    ENV["API_LOC"] = "http://localhost:3000";
  }

  if (environment === 'remote_dev') {
    ENV['simple-auth-oauth2'] = {
      serverTokenEndpoint: 'http://147.251.43.191:3000/auth'
    };
    ENV["API_LOC"] = "http://147.251.43.191:3000";
  }

  if (environment === 'prod_dev') {
    ENV['simple-auth-oauth2'] = {
      serverTokenEndpoint: 'http://147.251.43.191:4242/auth'
    };
    ENV["API_LOC"] = "http://147.251.43.191:4242";
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
    ENV["API_LOC"] = "http://147.251.43.191:3000";
    ENV['simple-auth-oauth2'] = {
      serverTokenEndpoint: 'http://147.251.43.191:3000/auth'
    }
  }

  ENV.i18n = {
    defaultLocale: 'cs'
  };

  return ENV;
};
