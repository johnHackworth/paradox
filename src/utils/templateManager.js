pdx.namespace('pdx.utils');

pdx.utils.TemplateManager = function() {
  this.templates = {};
  this.promises = {};
};

pdx.utils.TemplateManager.prototype = {
  get: function(template) {
    if (this.promises[template]) {
      return this.promises[template];
    } else {
      return this.fetch(template);
    }
  },
  assign: function(templateUrl, target, attribute) {
    var dfd = $.Deferred();
    this.get(templateUrl)
      .done(function(template) {
        target[attribute] = template;
        dfd.resolve();
      }).fail(dfd.reject);
    return dfd.promise();
  },
  fetch: function(template) {
    var self = this;
    var dfd = $.Deferred();
    self.promises[template] = dfd.promise();
    $.get(template).done(function(data) {
      self.templates[template] = _.template(data);
      dfd.resolve(self.templates[template]);
    }).fail(dfd.reject);
    return self.promises[template];
  },
  assignTemplates: function(dictionary, target, promise) {
    var nPromises = 0;
    for (var templateName in dictionary) {
      var url = dictionary[templateName];
      var localPromise = this.assign(url, target, templateName);
      nPromises++;
      localPromise.always(function() {
        nPromises--;
        if (!nPromises) {
          promise.resolve();
        }
      });
    }


  }
};