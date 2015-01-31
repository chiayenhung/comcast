var express = require ('express');
var mongoose = require ('mongoose');

var videoController = require ('./controllers/video_controller');

var app = express();

var mongodbURL = (process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/comcast');

mongoose.connect (mongodbURL);

app.configure(function(){
  app.use (express.compress());
  app.set ('title', "NYU Message");
  app.set ('views', __dirname + "/pages");
  app.set ('view engine', 'jade');
  app.use (express.bodyParser());
  app.use (express.cookieParser());
  app.use (express.session({secret: '1234567890QWERTY'}));
  app.use (express.static(__dirname + "/../dist/"));

  app.get ('/getAll', videoController.getAllVideos);
  app.get ('/videos', videoController.getVideos)

  app.get ('/filldb', videoController.filldb);

});

module.exports = app;
