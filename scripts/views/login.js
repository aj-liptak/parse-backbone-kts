// Filename: views/login
define([
  'jquery',
  'underscore',
  'parse',
  'scripts/router',
  'scripts/animate',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'text!templates/login.html'
], function($, _, Parse, Router, Animate, LoginTemplate){
  var LoginView = Parse.View.extend({

    el: $('#container'),

    render: function(){
      // Using Underscore we can compile our template with data
      var data = {};
      var compiledTemplate = _.template( LoginTemplate, data );
      // Append our compiled template to this Views "el"
      //this.$el.append( compiledTemplate );
      Animate.slideIn(this.el, compiledTemplate);
    },

    events: {
      'click input[data-name="login"]': "loginUser",
      'click input[data-name="sign-up"]': "goToSignUp"
    },

    loginUser: function (e) {
      e.stopPropagation();
      var user = new Parse.User();
      var username = this.$('#username').val();
      var password = this.$('#password').val();

      this.validateInputs(username, password);

      if(username.length > 0 && password.length > 0){

        var that = this;

        user.setUsername(username, {});
        user.setPassword(password, {});

        user.logIn({
          success: function(user) {
            console.log(user);
            Parse.history.navigate('contacts', true);
          },
          error: function(user, error) {
            that.$('.login-error').show();
          }
        });

      }
    },

    validateInputs: function (username, password) {

      username.length < 1 ? this.$('.username-error').show() : this.$('.username-error').hide();

      password.length < 1 ? this.$('.password-error').show() : this.$('.password-error').hide();

    },

    goToSignUp: function (e) {
      e.stopPropagation();
      this.$el.unbind('click');
      Parse.history.navigate('signUp', true);
    }
  });
  // Our module now returns our view
  return LoginView;
});
