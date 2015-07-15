module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/* Foundation */'
      },
      build: {
        src: 'bower_components/foundation/js/foundation.js',
        dest: 'public/js/libs.js'
      }
    },
    cssmin: {
       dist: {
          options: {
             banner: '/*! MyLib.js 1.0.0 | Aurelio De Rosa (@AurelioDeRosa) | MIT Licensed */'
          },
          files: {
             'dist/css/style.min.css': ['src/css/**/*.css']
          }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'cssmin']);

};