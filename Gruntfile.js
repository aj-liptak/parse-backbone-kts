/*global module:false*/
module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/**n * <%= pkg.title || pkg.name %> | <%= pkg.version %> | ' + '<%= grunt.template.today("yyyy-mm-dd") %>n' + ' * <%= pkg.homepage ? pkg.homepage : "" %>n' + ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>n */'
    },
    csslint: {
      files: {
        src: "app/styles/*.css",
        rules: {
          "import": false,
          "box-model": false,
          "adjoining-classes": false,
          "box-sizing": false,
          "font-faces": false,
          "floats": false,
          "font-sizes": false,
          "outline-none": false,
          "qualified-headings": false,
          "overqualified-elements": false,
          "unique-headings": false,
          "universal-selector": false,
          "duplicate-background-images": false,
          "known-properties": false,
          "empty-rules": false,
          "ids": false
        }
      }
    },
    clean: {
      folder: "dist"
    },
    concat: {
      scripts: {
        src: [
          '<banner:meta.banner>',
          'app/scripts/app.js',
          'app/scripts/common.js',
          'app/scripts/models.js',
          'app/scripts/controllers/*.js',
          'app/scripts/repositories/*.js',
          'app/scripts/services/*.js',
          'app/scripts/views/*.js'
        ],
        dest: 'dist/scripts/mpo-<%= pkg.version %>.js'
      },
      styles: {
        src: [
          '<banner:meta.banner>',
          'app/styles/reset.css',
          'app/styles/main.css',
          'app/styles/invoices.css',
          'app/styles/product-summary.css',
          'app/styles/overlays.css',
          'app/styles/exceptions.css',
          'app/styles/deliveries.css',
          'app/styles/ipad.css'
        ],
        dest: 'dist/styles/mpo-<%= pkg.version %>.css'
      }
    },
    uglify: {
      options: {
        mangle: true
      },
      my_target: {
        files: {
          'dist/scripts/mpo-<%= pkg.version %>.min.js': ['dist/scripts/mpo-<%= pkg.version %>.js']
        }
      },
    },
    watch: {
      files: ['app/styles/*.css', 'app/scripts/**/*.js', 'app/scripts/controllers/*.js'],
      tasks: ['jshint', 'csslint']
    },
    copy: {
      dist: {
        files: [
          {src: ['app/favicon.ico'], dest: 'dist/favicon.ico', filter: 'isFile'},
          {src: ['app/index.min.html'], dest: 'dist/index.html', filter: 'isFile'},
          {expand: true, cwd: 'app/scripts/vendor/', src: ['**'], dest: 'dist/scripts/vendor/', filter: 'isFile'},
          {expand: true, cwd: 'app/templates/', src: ['**'], dest: 'dist/templates/', filter: 'isFile'}
        ]
      },
      icons: {
        files: [
          {expand: true, cwd: 'app/images/icons/', src: ['**'], dest: 'dist/images/icons/', filter: 'isFile'},
          {expand: true, cwd: 'app/images/partner/', src: ['**'], dest: 'dist/images/partner/', filter: 'isFile'},
          {expand: true, cwd: 'app/images/help/', src: ['**'], dest: 'dist/images/help/', filter: 'isFile'}
        ]
      }
    },
    cssmin: {
      compress: {
        files: {
          'dist/styles/mpo-<%= pkg.version %>.min.css': ['dist/styles/mpo-<%= pkg.version %>.css']
        }
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/images',
          src: ['*.png'],
          dest: 'dist/images',
          ext: '.png'
        }]
      }
    },
    jshint: {
      beforeconcat: ['scripts/*.js', 'scripts/controllers/**/*.js'],
      afterconcat: ['dist/*.js'],
      options: {
        bitwise: true,
        curly: true,
        eqeqeq: true,
        forin: false,
        immed: true,
        latedef: true,
        newcap: false,
        noarg: true,
        plusplus: false,
        sub: true,
        trailing: false,
        undef: true,
        boss: true,
        laxbreak: true,
        eqnull: true,
        browser: true,
        devel: true,
        smarttabs: true,
        jquery: true,
        predef: [
          "jQuery",
          "require",
          "clone",
          "titleCaps",
          "Clementine",
          "include",
          "proxy",
          "Class",
          "Spinner",
          "Constants",
          "ErrorHandler",
          "StorageManager",
          "Handlebars",
          "iScroll",
          "Browser",
          "Mustache",
          "_",
          "Translate",
          "define",
          "require"
        ]
      }
    }
  });
  

  // load tasks
  grunt.loadNpmTasks('grunt-css');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  // Default task.
  grunt.registerTask('default', ['jshint:beforeconcat', 'csslint']);
  
  grunt.registerTask('build', ['clean', 'jshint:beforeconcat', 'csslint', 'concat', 'jshint:afterconcat', 'cssmin', 'uglify', 'copy', 'imagemin']);
  
  var connect = require('connect');
  
  grunt.registerTask('server', 'Start a custom web server.', function() {
    var done = this.async();
    grunt.log.writeln('Starting web server on port 8000.');
    var spawn = require('child_process').spawn;
    spawn('open', ['http://localhost:8000']);
    connect(connect.static('app')).listen(8000).on('close', done);
  });
  
  grunt.registerTask('serverDist', 'Start a custom web server.', function() {
    var done = this.async();
    grunt.log.writeln('Starting web server on port 9000.');
    var spawn = require('child_process').spawn;
    spawn('open', ['http://localhost:9000']);
    connect(connect.static('dist')).listen(9000).on('close', done);
  });
  
  
  grunt.registerTask('version', 'Versioning and changing environment', function(environment, version) {
    if (arguments.length !== 0) {  
      var fs = require('fs');
      var contentString;
      //Change the environment
      var envData = fs.readFileSync('dist/scripts/mpo-0.1.0.min.js', 'utf8');
      var envString = 'env: \"' + environment + '\",';
      contentString = envData.replace(/\s*env:\s*['"](.*?)['"],/g, envString);
      fs.writeFileSync('dist/scripts/mpo-0.1.0.min.js', contentString, 'utf8');
      var verString = 'v=' + version;
      //Change the version
      var verData = fs.readFileSync('dist/index.html', 'utf8');
      contentString = verData.replace(/v=1.0/g, 'v=' + version);
      
      fs.writeFileSync('dist/index.html', contentString, 'utf8');
      grunt.log.writeln('Environment Changed to ' + environment + ' v' + version);      
    }
  });
  
  grunt.registerTask('deploy', 'Start a custom web server.', function() {
  	require('shelljs/global');
  	rm('-R','/Volumes/WebContent/sites/MPO/*');
  	cp('-R', 'dist/*', '/Volumes/WebContent/sites/MPO/');
    var done = this.async();
    grunt.log.writeln('Starting web server on port 8000.');
    var spawn = require('child_process').spawn;
    spawn('open', ['http://localhost:8000']);
    connect(connect.static('dist')).listen(8000).on('close', done);
  });
  

};