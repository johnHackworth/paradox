var should = chai.should();

describe('Base controller ', function() {
  'use strict';

  var createController = function(container) {
    return new pdx.controllers.BaseController({
      model: new Backbone.Model({}),
      el: container,
      templateManager: {
        assignTemplates: function() {}
      }
    });
  };

  beforeEach(function() {
    this.container = $('<div></div>');
    this.controller = createController(this.container);
  });

  afterEach(function() {});

  it('should be able to initialize a base controller', function() {
    should.exist(this.controller);
  });
  it('should be able to remove all the subcontrollers', function() {
    var container = $('<div></div>');
    this.controller.subcontrollers.push(createController(container));
    this.controller.clearSubcontrollers();
    this.controller.subcontrollers.should.have.length(0);
  });
});