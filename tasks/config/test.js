module.exports = function(grunt) {

  grunt.config.set('mochaTest', {
    test: {
      options: {
        reporter: 'spec'
      },
      src: ['spec/helpers/**/*.js', 'coverage/spec/api/**/*.js']
    },
    coverage: {
      options: {
        reporter: 'html-cov',
        quiet: true,
        captureFile: 'coverage.html'
      },
      src: ['coverage/spec/api/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');

};