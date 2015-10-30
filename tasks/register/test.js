module.exports = function(grunt) {

  grunt.registerTask('test', 'Run tests and code coverage report.', ['clean:coverage', 'blanket', 'copy:coverage', 'mochaTest', 'clean:coverage']);

};