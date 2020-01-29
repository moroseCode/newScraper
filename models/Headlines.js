var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var headlinesSchema = new Schema({
  title: {
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
  },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comments" }]
});

var Headlines = mongoose.model("Headlines", headlinesSchema);

module.exports = Headlines;
