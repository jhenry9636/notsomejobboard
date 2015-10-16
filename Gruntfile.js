module.exports = function(grunt) {

  var config = {
    'public' :  {
      'css': 'public/css',
      'js': 'public/js',
      'scripts': 'public/scripts',
      'images': 'public/images'
    },
    'src' :  {
      'less': 'src/less',
      'js': 'src/js',
      'scripts': 'src/scripts',
      'images': 'src/images'
    }
  }


  grunt.initConfig({
    config: config,
    pkg: grunt.file.readJSON('package.json'),
    nodemon: {
      build: {
        script: 'app.js'
      }
    },
    uglify: {
      scripts: {
        files: {
          '<%= config.public.scripts %>/scripts.min.js': 
            ['<%= config.src.scripts %>/*.js', '<%= config.src.js %>/.js']
        }
      },
      app: {
        files: {
          '<%= config.public.js %>/app.min.js': '<%= config.src.js %>/*.js'
        }
      }
    },
    bower_concat: {
      all: {
        dest: 'src/scripts/bower.js',
        cssDest: 'src/less/plugins/bower.less'
      }
    },
    clean: {
      css: {
        src: ['<%= config.public.css %>']
      },
      js: {
        src: ['<%= config.public.js %>']
      }
    },
    less: {
      options: {
        compress: true
      },
      build: {
        files: {
          '<%= config.public.css %>/main.css': '<%= config.src.less %>/*.less'
        }
      },
      plugins: {
        files: {
          '<%= config.public.css %>/plugins.css': '<%= config.src.less %>/plugins/*.less'
        }        
      }
    },
    copy: {
      images: {
        src: '<%= config.src.images %>',
        dest: '<%= config.public.images %>'
      }
    },
    watch: {
      scripts: {
        files: ['<%= config.src.js %>/*.js'],
        tasks: ['uglify'],
        options: {
          spawn: false
        }
      },
      less: {
        files: ['<%= config.src.less %>/*.less'],
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

  require('load-grunt-tasks')(grunt)

  // register the nodemon task when we run grunt
  grunt.registerTask('default', ['clean','bower_concat', 'uglify', 'less', 'copy', 'concurrent']); 

};