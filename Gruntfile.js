module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // configure nodemon
    nodemon: {
      dev: {
        script: 'app.js'
      }
    },
    uglify: {
      dest: {
        files: {
          'public/app.min.js': ['bower_components/backbone/backbone-min.js']
        }
      }
    },
    watch: {
      scripts: {
        files: ['src/js/*.js'],
        tasks: ['uglify'],
        options: {
          spawn: false
        }
      },
      // css: {
      //   files: ['src/css/*.css'],
      //   tasks: ['default'],
      //   options: {
      //     spawn: false
      //   }
      // },
    },
    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  // load nodemon
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // register the nodemon task when we run grunt
  grunt.registerTask('default', ['concurrent']); 

};