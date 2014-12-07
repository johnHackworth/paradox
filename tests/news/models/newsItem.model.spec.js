var should = chai.should();

describe('newsItem model', function() {
  'use strict';

  beforeEach(function() {
    this.model = new pdx.models.NewsItem({
      timestamp: "2014-10-24T00:00"
    });
  });

  afterEach(function() {});

  it('should be able to initialize a model', function() {
    should.exist(this.model);
  });
  it('should be conver the timestamp to locale when exporting', function() {
    var expected = (new Date("2014-10-24T00:00")).toLocaleString();
    this.model.toJSON().timestamp.should.equal(expected);
  });
});