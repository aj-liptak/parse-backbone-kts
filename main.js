requirejs.config({
  paths: {
    "jquery": "scripts/libs/jquery-1.8.3",
    "underscore": "scripts/libs/underscore-amd",
    "parse": "scripts/libs/parse",
    "handlebars": "scripts/libs/handlebars"
  },
  shim: {
    "parse": {
      deps: ["jquery", "underscore"],
      exports: "Parse"
    },

    "handlebars": {
      exports: "Handlebars"
    }
  }
});

require([

  // Load our app module and pass it to our definition function
  'app'
], function(App){
  // The "app" dependency is passed in as "App"
  App.initialize();

});



