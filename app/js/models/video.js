(function () {
  define([], function () {
    var Video = Backbone.Model.extend({
      urlRoot: '/video',
      idAttribute: '_id',

      defaults: {
        title: null,
        description: null,
        logo: null,
        url: null
      }
    });

    return Video;
  });
})();