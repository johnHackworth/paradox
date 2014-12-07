window.pdx.namespace('pdx.models');

pdx.models.NewsItem = Backbone.Model.extend({
  url: function() {
    return pdx.config.paths.newsItem + '/' + this.get('id');
  },
  toJSON: function() {
    var json = Backbone.Model.prototype.toJSON.call(this);
    json.timestamp = (new Date(this.get('timestamp'))).toLocaleString();
    return json;
  }
});