var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentsSchema = new Schema({
  _headlinesId: {
    type: Schema.Types.ObjectId,
    ref: "Headlines"
  },
  commentsText: String
});

var Note = mongoose.model("Comments", NoteSchema);

module.exports = Comments;
