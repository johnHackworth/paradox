window.pdx.namespace('pdx.controllers');

pdx.controllers.NewsList = pdx.controllers.BaseController.extend({
  categories: ['news', 'info'],
  templateUrl: pdx.config.paths.urlBase + '/src/news/views/listView.html',
  events: {
    'change #categoryFilter': 'changeFilter',
    'change #sortBySelector': 'changeOrder',
    'change #sortOrderSelector': 'changeOrder',
    'click .restoreHiddenItems': 'restoreHiddenItems'
  },
  initBindings: function() {
    this.listenTo(this.model, 'change', this.render.bind(this));
  },
  getRenderData: function(options) {
    var json = {
      categories: this.categories,
      selectedCategory: this.model.category,
      sortBy: this.model.sortBy,
      order: this.model.order
    };
    if (options.hiddenItems) {
      json.hiddenItems = true;
    } else {
      json.hiddenItems = false;
    }
    return json;
  },
  getHiddenItems: function() {
    var itemsStr = localStorage.getItem('paradoxItems');
    if (itemsStr) {
      return itemsStr.split(',');
    } else {
      return [];
    }
  },
  render: function() {
    var hiddenItems = this.getHiddenItems();
    this.clearSubcontrollers();
    var data = this.getRenderData({
      hiddenItems: hiddenItems.length
    });
    this.$el.html(this.templates.view(data));
    var newsCollection = this.model.get('elements');
    for (var i = 0, l = newsCollection.models.length; i < l; i++) {
      var $itemContainer = this.getNewItemContainer(hiddenItems.indexOf(newsCollection.models[i].id) >= 0);
      var subcontroller = new pdx.controllers.NewsItem({
        model: newsCollection.models[i],
        el: $itemContainer,
        templateManager: this.templateManager
      });
      this.listenTo(subcontroller, 'hide', this.showHiddenWarning.bind(this));
      subcontroller.initialized.done(subcontroller.render.bind(subcontroller));
      this.subcontrollers.push(subcontroller);
    }
    $('.loader').addClass('hidden');
  },
  getNewItemContainer: function(isHidden) {
    var $itemContainer = $('<li></li>');
    $itemContainer.appendTo(this.$('ul'));
    if (isHidden) {
      $itemContainer.addClass('hidden');
    }
    return $itemContainer;
  },
  changeFilter: function(ev) {
    this.model.setCategory(this.$('#categoryFilter').val());
  },
  changeOrder: function(ev) {
    this.model.setOrder(this.$('#sortBySelector').val(), this.$('#sortOrderSelector').val());
  },
  restoreHiddenItems: function(ev) {
    ev.preventDefault();
    localStorage.setItem('paradoxItems', '');
    this.$('.hidden').removeClass('hidden');
    this.$('.warning').addClass('hidden');
  },
  showHiddenWarning: function() {

    this.$('.warning').removeClass('hidden');
  }

});