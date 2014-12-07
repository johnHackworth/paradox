window.pdx.namespace('pdx.routers');
pdx.routers.Main = Backbone.Router.extend({
  routes: {
    "item/:itemId": "itemView",
    ":category": "categoryView",
    "": "default"
  }
});