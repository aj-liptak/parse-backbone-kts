/**
 * Created by wmpdev on 10/1/13.
 */
define([
  'underscore',
  'parse'
], function(_, Parse){
  var UserModel = Parse.User.extend({

  });
  // Return the model for the module
  return {
    UserModel:UserModel
  }
});