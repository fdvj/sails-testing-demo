var chai = require('chai'),
    fs = require('fs');

chai.config.includeStack = true;

global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;

global.sinon = require('sinon');

global.request = require('supertest');

global._ = require('lodash');

// Load fixtures
global.fixtures = {};

_.each(fs.readdirSync(process.cwd() + '/spec/fixtures/'), function(file){
  global.fixtures[file.replace(/\.js$/, '').toLowerCase()] = require(process.cwd() + '/spec/fixtures/' + file);
});