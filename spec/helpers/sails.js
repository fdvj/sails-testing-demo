var Sails = require('sails'),
    _ = require('lodash'),
    wolfpack = require('wolfpack'),
    fs = require('fs'),
    sails;

global.wolfpack = wolfpack;

before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(10000);

  Sails.lift({
    // configuration for testing purposes
    log: {level: 'silent'}
  }, function(err, server) {
    sails = server;
    if (err) return done(err);

    // Lookup models for wolpack injection
    var files = _.filter(fs.readdirSync(process.cwd() + '/api/models/'), function(file){
      return /\.js$/.test(file);
    });

    // Inject wolfpack into files
    _.each(files, function(file){
      file = file.replace(/\.js$/, '');
      var spied = wolfpack(process.cwd() + '/api/models/' + file);
      global[file] = spied;
      sails.models[file.toLowerCase()] = spied;
    });
    
    // Set hook path so its easier to call in tests
    global.server = sails.hooks.http.app;
    
    done(err, sails);
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  Sails.lower(done);
});