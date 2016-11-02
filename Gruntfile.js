module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

  uglify: {
  	build: {
  		files: [
  			{src: ['js/perfmatters.js'], dest: 'js/perfmatters.min.js'},
  			{src: ['views/js/main.js'], dest: 'views/js/main.min.js'}
  		]
  	}
  },
  htmlmin: {
    dist: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      files: [
        {src: ['index_MOD.html'], dest: 'index_MOD.min.html'},
        {src: ['views/pizza.html'], dest: 'views/pizza.min.html'}
      ]
    }
  },
  cssmin: {
    target: {
       files: [
          {src: ['css/style.css'], dest: 'css/style.min.css'},
          {src: ['views/css/style.css'], dest: 'views/css/style.min.css'},
          {src: ['views/css/bootstrap-grid.css'], dest: 'views/css/bootstrap-grid.min.css'}
        ]
     }
   }
});

  grunt.loadNpmTasks('grunt-contrib-uglify'); //alerting Grunt of intention to use this
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['uglify', 'htmlmin', 'cssmin']); //associating commands to execute with Grunt command
};