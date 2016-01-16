import Ember from "ember";
import config from '../../config/environment';

export default Ember.Controller.extend( {
    store: Ember.inject.service(),
    session: Ember.inject.service(),

    needs:[ 'admin/users' ],
    queryParams: [ 'sel_users', 'achievement' ],
    achievement: undefined,
    sel_users: [],
    selected_users: [],
    add_user: Ember.computed.alias('model.users.firstObject'),
    task: undefined,
    saving: false,

    sel_user_param_observer: function() {
        var self = this;
        var users = this.get("sel_users").map(function(elem) {
            return self.get("store").find("user", elem);
        });
        this.set("selected_users", users);
    }.observes("sel_users"),

    actions: {
        'delete-user': function(user){
            this.get("selected_users").removeObject(user);
        },

        'add-user': function(){
            var users = this.get("selected_users");
            var new_user = this.get("add_user");

            if (users.contains(new_user)) {
                alert("Uživatel se již nacházi v seznamu!");
            } else {
                users.addObject(new_user);
            }
        },

        'achievement-grant': function(){
            var self = this;

            self.set("saving", true);
            self.set("grant_error", "");
            self.set("grant_status", "");

            self.get('controllers.admin/users').set('users_plain', []);

            if (self.get("achievement") === undefined) {
                self.set("achievement", self.get("model.achievements.firstObject.id"));
            }

            var tsk = null;
            if (self.get("task")) {
                tsk = self.get("task");
            }

            var send_data = {
                'achievement' : Number(self.get("achievement")),
                'task' : tsk,
                'users' : self.get("selected_users").map(function(elem){
                            return Number(elem.get("id"));
                        })
            };

            self.get('session').authorize('authorizer:oauth2', function(header, h) {
                    Ember.$.ajax({
                            url: config.API_LOC + "/admin/achievements/grant",
                            contentType: "application/json",
                            type: 'POST',
                            data: JSON.stringify(send_data, null, '\t'),
                            beforeSend: function(xhr) {
                                    xhr.setRequestHeader(header, h);
                                    self.set("grant_status", "Odesílám požadavek ...");
                            },
                            success: function() {
                                    self.set("grant_status", "Trofej úspěšně přidělena.");
                                    self.set("saving", false);
                            },
                            error: function(xhr) {
                                    self.set("grant_status", undefined);
                                    self.set("grant_error", "Chybová odpověď serveru:\n"+xhr.responseText);
                                    self.set("saving", false);
                            }
                    });
            });

        },
    },
});
