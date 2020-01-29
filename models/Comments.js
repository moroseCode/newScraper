var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentsSchema = new Schema({
  _headlinesId: {
    type: Schema.Types.ObjectId,
    ref: "Headlines"
  },
  commentsText: String
});

var Comments = mongoose.model("Comments", CommentsSchema);

module.exports = Comments;
