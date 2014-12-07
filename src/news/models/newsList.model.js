window.pdx.namespace('pdx.models');

pdx.models.NewsList = Backbone.Model.extend({
  initialize: function(options) {
    this.set(options);
    this.category = options.category || '';
    this.sortBy = '';
    this.order = 'asc';
  },
  url: function() {
    var url = pdx.config.paths.newsList + '/' + this.category;
    if (this.sortBy && this.sortBy !== '') {
      url += '?sortBy=' + this.sortBy + '&order=' + this.order;
    }
    return url;
  },
  setCategory: function(cat) {
    this.category = cat;
    this.fetch();
  },
  setOrder: function(sortBy, orderDirection) {
    this.sortBy = sortBy;
    this.order = orderDirection;
    this.fetch();
  },
  set: function(data) {
    var collection = new pdx.models.NewsCollection(data);
    Backbone.Model.prototype.set.call(this, 'elements', collection);
  },
  toJSON: function() {
    var el = this.get('elements');
    return el.toJSON();
  }

});