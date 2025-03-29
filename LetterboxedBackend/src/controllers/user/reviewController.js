import mongoose from "mongoose";
import movieanduserSchema from "../../models/schema/movieanduserSchema.js";
import reviewSchema from "../../models/schema/reviewSchema.js";

const getNewReviews = async (req, res) => {
  const newReviews = await reviewSchema
    .find()
    .populate("user", "userName")
    .populate("movie", "title smallPoster")
    .sort({ createdAt: -1 })
    .limit(12);

  res.status(200).json({
    message: "reviews fetched successfully",
    data: newReviews,
  });
};

const getPopularOfTheWeek = async (req, res) => {
  const currentDate = new Date();
  const startOfWeek = new Date(currentDate);
  startOfWeek.setUTCDate(currentDate.getUTCDate() - 7);
  startOfWeek.setUTCHours(0, 0, 0, 0);
  const endOfWeek = new Date(currentDate);
  endOfWeek.setUTCHours(23, 59, 59, 999);

  const popularReviews = await reviewSchema
    .find({
      $expr: {
        $and: [
          { $gte: [{ $toDate: "$createdAt" }, startOfWeek] },
          { $lte: [{ $toDate: "$createdAt" }, endOfWeek] },
        ],
      },
    })
    .sort({ likes: -1 })
    .limit(6)
    .populate("user", "userName email")
    .populate("movie", "title releaseYear smallPoster");

  res.status(200).json({
    message: "success",
    data: popularReviews,
  });
};

const avgRatingAndCount = async (req, res) => {
  const movieId = req.params.id;
  const ratingsData = await movieanduserSchema
    .find({
      movie: movieId,
      rating: { $gte: 0.5 },
    })
    .select("rating");

  const validRatings = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

  const ratingCounts = {};
  validRatings.forEach((r) => (ratingCounts[r] = 0));

  let total = 0;
  let count = 0;

  ratingsData.forEach(({ rating }) => {
    if (ratingCounts.hasOwnProperty(rating)) {
      ratingCounts[rating]++;
      total += rating;
      count++;
    } else {
      console.log("Unexpected rating in DB:", rating);
    }
  });

  const averageRating = count > 0 ? parseFloat((total / count).toFixed(2)) : 0;

  const ratingsBreakdown = validRatings.map((r) => ({
    name: r,
    value: ratingCounts[r],
  }));

  res.status(200).json({
    ratingsBreakdown,
    averageRating,
    totalCount: count,
  });
};

const getPopReviewById = async (req, res) => {
  const movieId = req.params.id;
  const popularReviews = await reviewSchema
    .find({
      movie: movieId,
    })
    .populate("user", "userName")
    .sort({ likes: -1 })
    .limit(3);

  res.status(200).json({
    data: popularReviews,
  });
};

const writeAReview = async (req, res) => {
  const { movieId, rating, reviewText } = req.body;
  const userId = req.user.id;

  if (!userId || !movieId) {
    return res.status(400).json({ message: "userId and movieId are required" });
  }

  // Validate ObjectIds
  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(movieId)
  ) {
    return res.status(400).json({ message: "Invalid userId or movieId" });
  }

  // Prepare review update data
  const reviewUpdateData = {};
  if (rating !== undefined)
    reviewUpdateData.rating = Math.min(Math.max(rating, 0), 5);
  if (reviewText !== undefined) reviewUpdateData.reviewText = reviewText;

  // Prepare MovieUserInteraction update data
  const interactionUpdateData = {
    user: userId,
    movie: movieId,
    watchedAt: new Date(), // Set watchedAt since writing a review implies watching
  };
  if (rating !== undefined)
    interactionUpdateData.rating = Math.min(Math.max(rating, 0), 5);
  // If liking the movie (not the review) is implied, uncomment below
  // interactionUpdateData.likedAt = new Date();

  // Start a session for atomic updates
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Check if a review already exists
    const existingReview = await reviewSchema.findOne({
      user: userId,
      movie: movieId,
    }).session(session);

    let reviewResponse;
    if (existingReview) {
      // Update existing review
      reviewResponse = await reviewSchema.findOneAndUpdate(
        { user: userId, movie: movieId },
        { $set: reviewUpdateData },
        { new: true, runValidators: true, session }
      )
        .populate("movie", "title")
        .populate("user", "userName");
    } else {
      // Create new review
      const reviewData = {
        user: userId,
        movie: movieId,
        rating:
          rating !== undefined ? Math.min(Math.max(rating, 0), 5) : undefined,
        reviewText: reviewText || undefined,
      };
      const newReview = new reviewSchema(reviewData);
      await newReview.save({ session });
      reviewResponse = await reviewSchema.findById(newReview._id)
        .session(session)
        .populate("movie", "title")
        .populate("user", "userName");
    }

    // Update or create MovieUserInteraction
    await movieanduserSchema.findOneAndUpdate(
      { user: userId, movie: movieId },
      { $set: interactionUpdateData },
      { upsert: true, new: true, runValidators: true, session } // Upsert creates if not exists
    );

    // Commit the transaction
    await session.commitTransaction();

    // Prepare response
    res.status(existingReview ? 200 : 201).json({
      message: existingReview
        ? "Review updated successfully"
        : "Review created successfully",
      data: {
        id: reviewResponse._id,
        movieId: reviewResponse.movie._id,
        movieTitle: reviewResponse.movie.title,
        userId: reviewResponse.user._id,
        userName: reviewResponse.user.userName,
        rating: reviewResponse.rating || 0,
        reviewText: reviewResponse.reviewText || "",
        createdAt: reviewResponse.createdAt,
        updatedAt: reviewResponse.updatedAt,
      },
    });
  } catch (error) {
    // Rollback on error
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
export {
  getNewReviews,
  getPopularOfTheWeek,
  avgRatingAndCount,
  getPopReviewById,
  writeAReview,
};
