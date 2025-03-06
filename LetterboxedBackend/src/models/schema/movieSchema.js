import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    genre: [{ type: String, required: true }],
    director: { type: String, required: true },
    cast: [{ type: String }],
    smallPoster: { type: String, default: "" },
    bigPoster: { type: String, default: "" },
    description: { type: String },
    ratings: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        rating: { type: Number, min: 0, max: 10 },
        review: { type: String },
      },
    ],
    avgRating: { type: Number, default: 0 },
    isOscar:{ type: Boolean, default: false },
  },
  { timestamps: true }
);


export default mongoose.model("filims",MovieSchema)