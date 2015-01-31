(function () {
  define(['views/indexView'], function (IndexVew) {
    var Router = Backbone.Router.extend({

      initialize: function () {

      },

      routes: {
        '.*' : 'index'
      },

      index: function () {
        var indexView = new IndexVew({
          el: ".container"
        });
        indexView.render();
      }

    });

    return Router;
  });
})();