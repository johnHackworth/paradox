window.pdx.namespace('pdx.models');

pdx.models.NewsCollection = Backbone.Collection.extend({
  model: pdx.models.NewsItem
});