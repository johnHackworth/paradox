var should = chai.should();

describe('newsList model', function() {
  'use strict';

  beforeEach(function() {
    this.model = new pdx.models.NewsList([]);
  });

  afterEach(function() {});

  it('should be able to initialize a model', function() {
    should.exist(this.model);
  });
  it('should export only the elements of the embed collection', function() {
    var json = this.model.toJSON();
    _.isArray(json).should.be.true();
    json.should.have.length(0);
  });
  it('should add sort parameters to the resquest when needed', function() {
    this.model.sortBy = 'test';
    this.model.url().should.equal(pdx.config.paths.newsList + '/?sortBy=test&order=asc');
  });
});