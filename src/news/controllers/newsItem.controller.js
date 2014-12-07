window.pdx.namespace('pdx.controllers');

pdx.controllers.NewsItem = pdx.controllers.BaseController.extend({
  templateUrl: pdx.config.paths.urlBase + '/src/news/views/listItem.html',
  events: {
    'click .hide': 'hide'
  },
  initBindings: function() {
    this.listenTo(this.model, 'change', this.render.bind(this));
  },
  getRenderData: function() {
    var json = this.model.toJSON();
    json.isFullPage = this.isFullPage;
    return json;
  },
  render: function() {
    this.$el.data('id', this.model.get('id'));
    var compiledTemplate = this.templates.view(this.getRenderData());
    this.$el.append(compiledTemplate);
    $('.loader').addClass('hidden');
  },
  hide: function(ev) {
    ev.preventDefault();
    this.animateHide(ev);
    this.markAsHidden();
  },
  markAsHidden: function() {
    var items = localStorage.getItem('paradoxItems');
    if (items) {
      items += ',' + this.model.get('id');
    } else {
      items = this.model.get('id');
    }
    localStorage.setItem('paradoxItems', items);
  },
  animateHide: function(ev) {
    $(ev.currentTarget).parents('li').addClass('hidden');
    this.trigger('hide');
  }

});