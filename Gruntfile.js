module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodemon: {
      build: {
        script: 'app.js'
      }
    },
    uglify: {
      scripts: {
        files: {
          'public/js/scripts.min.js': 'src/scripts/*.js'
        }
      },
      app: {
        files: {
          'public/js/app.min.js': 'src/js/*.js'
        }
      }
    },
    clean: {
      css: {
        src: ['public/css']
      },
      js: {
        src: ['public/js']
      }
    },
    less: {
      options: {
        compress: true
      },
      build: {
        files: {
          'public/css/main.css': 'src/less/*.less'
        }
      },
      plugins: {
        files: {
          'public/css/plugins.css': 'src/less/plugins/*.less'
        }        
      }
    },
    copy: {
      images: {
        src: 'src/images',
        dest: 'public/images'
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
      less: {
        files: ['src/less/*.less'],
        tasks: ['less'],
        options: {
          spawn: false
        }
      }
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

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // register the nodemon task when we run grunt
  grunt.registerTask('default', ['clean','uglify', 'less', 'copy', 'concurrent']); 

};