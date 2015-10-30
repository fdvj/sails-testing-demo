module.exports = function(grunt) {

  grunt.config.set('blanket', {
    coverage: {
      src: ['api/'],
      dest: 'coverage/api/'
    }
  });

  grunt.loadNpmTasks('grunt-blanket');

};