module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect : {
      server: {
        options: {
          port: 3000,
          protocol: 'http',
          hostname: 'localhost',
          base: 'public',
          directory: null,
          open: 'http://localhost:3000',
          keepalive: true
        }
      }
    },
    ejs: {
      all: {
        src: ['views/*.ejs', 'views/partials/*.ejs'],
        dest: 'public/html',
        expand: true,
        ext: '.html',
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-ejs');

  // Default task(s).
  grunt.registerTask('default', ['ejs','connect']);

};