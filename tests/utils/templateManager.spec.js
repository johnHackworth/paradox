var should = chai.should();

describe('Template Manager ', function() {
  'use strict';
  var server = null;

  beforeEach(function() {
    server = sinon.fakeServer.create();
    this.templateManager = new pdx.utils.TemplateManager();
  });

  afterEach(function() {
    server.restore();
  });

  it('should be able to request a template', function(done) {
    this.templateManager.fetch('test').done(function(result) {
      result().should.equal('test');
      done();
    }).fail(done);
    server.requests[0].respond(
      200, {
        "Content-Type": "text/html"
      },
      "test"
    );
  });
  it('should not request a template again if the template is already requested', function(done) {
    this.templateManager.get('test');
    this.templateManager.get('test').done(function(result) {
      result().should.equal('test');
      done();
    }).fail(done);
    server.requests[0].respond(
      200, {
        "Content-Type": "text/html"
      },
      "test"
    );
  });

  it('should return a template already stored without retrieving it again', function(done) {
    var self = this;
    this.templateManager.get('test').done(function(result) {
      return self.templateManager.get('test');
    }).done(function(res) {
      res().should.equal('test');
      done();
    }).fail(done);
    server.requests[0].respond(
      200, {
        "Content-Type": "text/html"
      },
      "test"
    );
  });
});