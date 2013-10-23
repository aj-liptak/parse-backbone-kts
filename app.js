define([
  'jquery',
  'underscore',
  'parse',
  'scripts/router' // Request router.js
], function($, _, Parse, Router){
  var initialize = function(){
    // Pass in our Router module and call it's initialize function
    Parse.initialize("kVqHCVfsb0i4JFUfAYw47QIP4rKG582t1O2PWfGc", "YERnjVxpjEoKHNUg6nLyhTZyzYvphGlUG2AIM95b");
    Router.initialize();
  }

  return {
    initialize: initialize
  };
});
