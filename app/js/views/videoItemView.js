(function () {
  define(['backbone', 'templates'], function (Backbone, templates) {
    var VideoItemView = Backbone.View.extend({
      template: templates['videoItemView'],

      initialize: function (options) {
        this.model = options.model;
      },

      render: function () {
        var copy = this;
        copy.$el.html(_.template(copy.template, copy.model.attributes));
      }

    });

    return VideoItemView;
  });
})();