var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SessionSchema = new Schema({
  token: String,
  cookies: String,
  expires: Date
})

module.exports = mongoose.model('Session',SessionSchema);
