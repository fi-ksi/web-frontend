import Session from "simple-auth/session";

export default {  
  name: "custom-session",

  initialize: function(instance) {
    Session.reopen({
      setCurrentUser: function() {
        var self = this;
        return instance.container.lookup("service:store").find("profile", "").then(function(user) {
            self.set("current_user", user);
            console.log(user);
            console.log("Changed");
          });
      }.observes("isAuthenticated")
    });
  }
};