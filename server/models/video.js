var mongoose = require ('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Video = new Schema( {
  title: String,
  description: String,
  logo: String,
  url: String
});

module.exports = mongoose.model ('Video', Video);
