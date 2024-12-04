import mongoose from "mongoose";
const Schema = mongoose.Schema;
const commentsSchema = new Schema({
  postid: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
   },
  sender: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Comments", commentsSchema);
