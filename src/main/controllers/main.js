window.pdx.namespace('pdx.app.main');

pdx.app.Main = function() {
  this.initialization = $.Deferred();
  this.initialization.promise().done(this.initializeAfterLoad.bind(this));
  this.$el = $('.prxContent');
  this.templateManager = new pdx.utils.TemplateManager();
  this.getTemplates();
};
pdx.app.Main.prototype = {
  getTemplates: function() {
    var self = this;
    this.templates = {};
    this.templateManager.assignTemplates({
      frame: pdx.config.paths.urlBase + '/src/main/views/frame.html',
      header: pdx.config.paths.urlBase + '/src/main/views/header.html',
      footer: pdx.config.paths.urlBase + '/src/main/views/footer.html'
    }, this.templates, this.initialization);
  },
  initializeAfterLoad: function() {

    this.render();
    this.initializeRoutes();
  },
  initializeRoutes: function() {
    this.router = new pdx.routers.Main();

    this.router.on('route:default', this.initializeNewsFeed.bind(this));
    this.router.on('route:itemView', this.initializeItemView.bind(this));
    this.router.on('route:categoryView', this.initializeNewsFeed.bind(this));

    Backbone.history.start();
  },
  render: function() {
    this.$el.html(this.templates.frame);
    this.$el.find('header').html(this.templates.header());
    this.$el.find('footer').html(this.templates.footer());
    this.contentContainer = this.$el.find('.mainContent');
  },
  clearState: function() {
    if (this.currentController) {
      this.currentController.unbind();
      this.contentContainer.html('');
      this.currentModel = null;
    }
  },
  initializeNewsFeed: function(category) {
    $('.loader').removeClass('hidden');
    this.clearState();
    this.currentModel = new pdx.models.NewsList({
      category: category
    });
    this.currentController = new pdx.controllers.NewsList({
      el: this.contentContainer,
      model: this.currentModel,
      templateManager: this.templateManager
    });
    this.currentModel.fetch();
  },
  initializeItemView: function(id) {
    $('.loader').removeClass('hidden');
    this.clearState();
    this.currentModel = new pdx.models.NewsItem({
      id: id
    });

    this.currentController = new pdx.controllers.NewsItem({
      el: this.contentContainer,
      model: this.currentModel,
      templateManager: this.templateManager
    });
    this.currentController.isFullPage = true;
    this.currentModel.fetch();
  }
};

pdx.app.current = new pdx.app.Main();