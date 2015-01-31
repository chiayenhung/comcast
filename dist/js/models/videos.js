(function () {
  define(['models/video'], function (Video) {
    var Videos = Backbone.Collection.extend({
      model: Video,
      sort_key: '_id',
      url: '/videos',
      offset: 1,

      comparator: function (video) {
        return video.get(this.sort_key);
      },

      sortByField: function (field, cb) {
        if (field == 'ID')
          field = '_id';
        this.sort_key = field.toLowerCase();
        this.sort();
        cb();
      },

      lazyLoad: function (cb) {
        var copy = this;
        copy.fetch({remove: false, data: {offset: copy.offset}}).then(function (videos) {
          copy.offset += 1;
          cb(null, videos);
        }, function (err) {
          cb(err);
        });
      },

      search: function (term, cb) {
        var copy = this;
        copy.fetch({remove: true, data: {term: term, offset: copy.offset}}).then(function (videos) {
          copy.offset += 1;
          cb(null, videos);
        }, function (err) {
          cb(err);
        });
      }
    });

    return Videos;
  })
})();