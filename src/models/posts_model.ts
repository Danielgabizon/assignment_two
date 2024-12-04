import mongoose from "mongoose";

export interface IPost {
  sender: number;
  title: string;
  content: string;
}

const Schema = mongoose.Schema;
const postsSchema = new Schema<IPost>({
  sender: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IPost>("Posts", postsSchema);
