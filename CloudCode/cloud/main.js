//Definition of getContacts
Parse.Cloud.define("getContacts", function(request, response) {
  var query = new Parse.Query("Contact");
  query.equalTo("user", Parse.User.current());
  query.find({
    success: function(userContacts) {
      // userContacts contains all contacts created by the current user.
      response.success(userContacts);
    },

    error: function(){
      response.error('contacts lookup failed');
    }
  });
});
