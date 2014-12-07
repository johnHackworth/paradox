window.pdx.namespace('pdx.controllers');

pdx.controllers.BaseController = Backbone.View.extend({
  initialize: function(options) {
    this.initialization = $.Deferred();
    this.initialized = this.initialization.promise();
    this.templateManager = options.templateManager;
    this.templates = {};
    this.subcontrollers = [];
    this.templateManager.assignTemplates({
      view: this.templateUrl,
    }, this.templates, this.initialization);
    this.initialized.done(this.initBindings.bind(this));
    this.initialized.done(this.trigger.bind(this, 'initialized'));
  },
  initBindings: function() {},
  clearSubcontrollers: function() {
    while (this.subcontrollers.length) {
      var subcontroller = this.subcontrollers.pop();
      subcontroller.remove();
      subcontroller.unbind();
    }
  },
});