var fs = require ('fs');
var Video = require('../models/Video');
var videoController = {};
var ITEM_PER_PAGE = 6;

videoController.getAllVideos = function (req, res) {
  Video.find({}, function (err, videos) {
    if (err)
      res.send(503, err);
    else if (!videos)
      res.send(404, 'video not found');
    else
      res.send (videos);
  });
};

videoController.getVideos = function (req, res) {
  var offset = req.query.offset || 0,
      query = {},
      term = req.query.term;
  if (term) {
    query['title'] = new RegExp(term, 'i');
    query['description'] = new RegExp(term, 'i');
  }
  Video.find(query).skip(ITEM_PER_PAGE * offset).limit(ITEM_PER_PAGE).exec(function (err, videos) {
    if (err)
      res.send(503, err);
    else if (videos.length == 0)
      res.send(404, 'video not found');
    else
      res.send(videos);
  });

};

videoController.filldb = function (req, res) {
  var path = __dirname + '/../../db/data.json';
  var result = [];

  fs.readFile (path, function(err, videos) {
    videos = JSON.parse(videos);
    if (err) {
      res.send (500, err);
    }
    else {
      if (!videos) {
        res.send (404, 'dataset empty');
      }
      else {
        read(videos, function(){
          res.send (videos);          
        });
      }
    }
  });
};

module.exports = videoController;

function read (data, cb) {
  Video.find( {}, function(err, videos){
    if (videos.length <= 0) {
      for (var i = 0; i < data.length; i++) {
        if (data[i][0] != "") {
          console.log(data[i]);
          insert(data[i]);      
        }
        if (i >= data.length - 1) {
          cb();
        }
      }
    }
    else {
      cb();
    }
  });
}

function insert (data) {
  var video = new Video({
    logo: data.logo,
    title: data.title,
    description: data.description,
    url: data.url
  });
  video.save(function(err, video){
    if (err) {
      console.log (err);
    }
  })
};