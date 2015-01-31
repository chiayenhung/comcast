(function () {
  requirejs.config ({
    paths: {
      'jquery': "lib/jquery-1.11.1.min",
      'underscore': "lib/underscore-min",
      'backbone': "lib/backbone-min"
    },
    shims: {
      'jquery': {exports: '$'},
      'underscore': {exports: '_'},
      'backbone': {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      }
    }
  });

  requirejs(['backbone', 'router'], function (Backbone, Router) {
    var router = new Router();
    Backbone.history.start();
  });

})();