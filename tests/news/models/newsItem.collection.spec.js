var should = chai.should();

describe('newsItem collection', function() {
  'use strict';

  beforeEach(function() {
    this.model = new pdx.models.NewsCollection();
  });

  afterEach(function() {});

  it('should be able to initialize a model', function() {
    should.exist(this.model);
  });
});