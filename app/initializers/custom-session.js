import Session from "simple-auth/session";

export default {  
  name: "custom-session",
  before: "simple-auth",
  initialize: function(container) {
    Session.reopen({
      setCurrentUser: function() {
        var self = this;
        return container.lookup("service:store").find("profile", "").then(function(user) {
            self.set("current_user", user);
            console.log(user);
            console.log("Changed");
          });
      }.observes("isAuthenticated")
    });
  }
};