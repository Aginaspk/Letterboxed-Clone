import reviewSchema from "../../models/schema/reviewSchema.js";

const getNewReviews = async (req, res) => {
  const newReviews = await reviewSchema
    .find()
    .populate("user", "userName")
    .populate("movie", "title smallPoster")
    .sort({ createdAt: -1 })
    .limit(6);

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

export { getNewReviews, getPopularOfTheWeek };
