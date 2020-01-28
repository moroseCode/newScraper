var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var headlineSchema = new Schema({
  headline: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  }
});

var Headlines = mongoose.model("Headlines", headlinesSchema);

module.exports = Headlines;
