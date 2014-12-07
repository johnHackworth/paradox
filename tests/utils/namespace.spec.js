var should = chai.should();

describe('Namespace ', function() {
  'use strict';

  beforeEach(function() {});

  afterEach(function() {
    delete window.testNamespace;
  });

  it('should be able to create a namespace', function() {
    pdx.namespace('testNamespace.test.test2');
    should.exist(window.testNamespace.test.test2);
  });

  it('should not overwrite existant namespaces', function() {
    pdx.namespace('testNamespace.test.test2');
    pdx.namespace('testNamespace.test3.test4');
    should.exist(window.testNamespace.test.test2);
  });
});