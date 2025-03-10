import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "filims",
      required: true,
    },
    rating: { type: Number, min: 0, max: 10 }, 
    reviewText: { type: String },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  },
  { timestamps: true }
);

export default mongoose.model("reviews", ReviewSchema);
