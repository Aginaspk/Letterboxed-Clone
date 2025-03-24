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
  const ratingsData = await movieanduserSchema.find({
    movie: movieId,
    rating: { $gte: 0.5 },
  }).select("rating");

  const validRatings = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

  const ratingCounts = {};
  validRatings.forEach(r => ratingCounts[r] = 0);

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

  const ratingsBreakdown = validRatings.map(r => ({
    name: r,
    value: ratingCounts[r],
  }));

  res.status(200).json({
    ratingsBreakdown,
    averageRating,
    totalCount: count,
  });
};


const getPopReviewById = async(req,res)=>{
  const movieId = req.params.id;
  const popularReviews = await reviewSchema.find({
    movie: movieId,
  })
    .populate("user", "userName")
    .sort({ likes: -1 }) 
    .limit(3);

    res.status(200).json({
      data:popularReviews
    })
}
export { getNewReviews, getPopularOfTheWeek, avgRatingAndCount,getPopReviewById };
