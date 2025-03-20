import mongoose from "mongoose";

const movieUserInteractionSchema = new mongoose.Schema(
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
    watchedAt: {
      type: Date,
      default: null, 
    },
    likedAt: { 
      type: Date,
      default: null, 
    },
    isInWatchlist: { type: Boolean, default: false },
    rating: { type: Number, default: 0, min: 0, max: 5 },
  },
  {
    timestamps: true,
  }
);

movieUserInteractionSchema.index({ movie: 1, watchedAt: -1 });
movieUserInteractionSchema.index({ user: 1, movie: 1 });

export default mongoose.model("MovieUserInteraction", movieUserInteractionSchema);