import Ember from "ember";

export default Ember.Controller.extend( {
    actions: {
        login: function() {
            var _this = this;
            const { identification, password } = this.getProperties('identification', 'password');
            this.set('password', "");
            this.get('session').authenticate('authenticator:oauth2', identification, password).then(null, function(error) {
                _this.set('errorMessage', error.error);
            });
        }
    }
});
