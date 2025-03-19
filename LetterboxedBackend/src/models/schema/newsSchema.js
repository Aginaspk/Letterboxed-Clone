import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: { type: String },
    news: { type: String },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('news',newsSchema)