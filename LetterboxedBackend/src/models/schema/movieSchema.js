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
    smallDescription: { type: String },
    avgRating: { type: Number, default: 0 },
    isOscar: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("filims", MovieSchema);
