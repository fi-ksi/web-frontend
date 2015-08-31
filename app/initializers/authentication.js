import CustomAuthenticator from '../authenticators/basicauth';

export default {
  name:       'authentication',
  before:     'simple-auth',
  initialize: function(container, application) {
    application.register('authenticator:basicauth', CustomAuthenticator);
  }
};