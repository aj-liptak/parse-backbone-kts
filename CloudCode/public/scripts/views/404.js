// Filename: views/404
define([
  'jquery',
  'underscore',
  'parse',
  'scripts/router',
  'scripts/animate',
  // Using the Require.js text! plugin, we are loaded raw text
  // which will be used as our views primary template
  'text!templates/404.html'
], function($, _, Parse, Router, Animate, ErrorTemplate){
  var ErrorView = Parse.View.extend({

    el: $('#container'),

    render: function(){
      // Using Underscore we can compile our template with data
      var data = {};
      var compiledTemplate = _.template( ErrorTemplate, data );
      // Append our compiled template to this Views "el"
      //this.$el.append( compiledTemplate );
      Animate.slideIn(this.el, compiledTemplate);
    }
  });
  // Our module now returns our view
  return ErrorView;
});
