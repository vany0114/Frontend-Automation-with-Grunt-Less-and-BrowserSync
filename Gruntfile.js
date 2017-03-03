// AdminLTE Gruntfile
module.exports = function (grunt) {

  'use strict';
  require('jit-grunt')(grunt);

  grunt.initConfig({
    watch: {
      styles: {      
        files: ["build/less/*.less"],
        tasks: ["less"]
      },
      scripts: {
        files: ["scripts/app/**/*.js"],
        tasks: ["concat", "uglify"]
      }
    },

    // "less"-task configuration  
    less: {
      development: {
        options: {
          compress: false
        },
        files: {
          "dist/css/site.css": "build/less/site.less",          
        }
      },
      production: {
        options: {
          compress: true
        },
        files: {
          "dist/css/site.min.css": "build/less/site.less",          
        }
      }
    },

    // Concat files.
    concat: {
        dist: {
            files: {
                'dist/js/app.js': ['scripts/app/module.js', 'scripts/app/**/*.js']
            }
        },
    },

    // Uglify task info. Compress the js files.
    uglify: {
      options: {
        sourceMap: true,
        sourceMapIncludeSources: true
      },
      my_target: {
        files: {
          'dist/js/app.min.js': ['scripts/app/module.js', 'scripts/app/**/*.js']
        }
      }
    },

    // to refresh changes on server
    browserSync: {
        dev: {
            bsFiles: {
                src : ['dist/css/*.css', 'dist/js/*.js', 'views/*.html']
            },
            options: {
                watchTask: true,
                host : "127.0.0.1"
            }
        }
    }
  });

  // Load all grunt tasks

  // LESS Compiler
  grunt.loadNpmTasks('grunt-contrib-less');
  // Watch File Changes
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Compress JS Files
  grunt.loadNpmTasks('grunt-contrib-uglify'); 
  // Concat files.
  grunt.loadNpmTasks('grunt-contrib-concat');
  // refresh changes on server
  grunt.loadNpmTasks('grunt-browser-sync');

  grunt.registerTask('default', ['concat', 'uglify', 'less', 'browserSync', 'watch']);
};
