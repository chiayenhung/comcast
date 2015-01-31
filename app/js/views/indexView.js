(function () {
  define(['templates', 'models/videos', 'views/videoItemView'], function (templates, Videos, VideoItemView) {
    var IndexView = Backbone.View.extend({
      template: templates['indexView'],
      loading: false,
      stopped: false,

      initialize: function () {
        this.videos = new Videos();
      },

      events: {
        'mousewheel .video_container': 'scrolling',
        'keyup .search_bar': 'search',
        'change .sort_bar': 'sort'
      },

      sort: function (e) {
        var $bar = $(e.target),
            field = $bar.val(),
            copy = this;
        copy.videos.sortByField(field, function () {
          copy.$el.find(".video_container").empty();
          copy.videos.forEach(function (v) {
            copy.appendvideoItemView(v);
          });
        })
      },

      search: function (e) {
        var $textarea = $(e.target),
            val = $textarea.val(),
            copy = this;
        copy.stopped = false;
        if (val.length >= 0) {
          copy.$el.find(".video_container").empty();
          copy.load(true);
          copy.videos.offset = 0;
          copy.videos.search(val, function (err, videos) {
            if (err) {
              console.error(err);
            }
            else {
              copy.videos.forEach(function (v) {
                copy.appendvideoItemView(v);
              });
            }
            copy.load(false);
          });
        }
      },

      load: function (loading) {
        var copy = this;
        copy.$el.find(".wheel_container").removeClass("active");
        if (loading) {
          copy.loading = true;
          copy.$el.find(".wheel_container").addClass("active");
        }
        else
          copy.loading = false;
      },

      scrolling: function (e) {
        var copy = this,
            $window = $(window),
            $document = $(document);
        if (copy.stopped)
          return;
        if (!copy.loading && $window.scrollTop() + $window.height() > $document.height() - 100) {
          copy.load(true);
          copy.videos.lazyLoad(function (err, videos) {
            if (err) {
              copy.stopped = true;
              console.error(err);
            }
            else {              
              videos.forEach(function (video) {
                var model = copy.videos.get(video._id);
                copy.appendvideoItemView(model);
              });
            }
            copy.load(false);
          });
        }
      },

      appendvideoItemView: function (v) {
        var copy = this;
        var videoItemView = new VideoItemView({model: v});
        copy.$el.find(".video_container").append(videoItemView.$el);
        videoItemView.render();
      },

      render: function () {
        var copy = this;
        copy.$el.html(_.template(copy.template));
        copy.videos.fetch().then(function () {
          copy.videos.forEach(function (v) {
            copy.appendvideoItemView(v);
          });
        })
        return this;
      }

    });

    return IndexView;
  });
})();