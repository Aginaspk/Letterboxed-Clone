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

// 
const getPopularOfTheWeek = async (req, res) => {
  try {
    const currentDate = new Date();

    // Start of the week (7 days before today at 00:00:00 UTC)
    const startOfWeek = new Date(currentDate);
    startOfWeek.setUTCDate(currentDate.getUTCDate() - 7);
    startOfWeek.setUTCHours(0, 0, 0, 0);

    // End of the week (today at 23:59:59 UTC)
    const endOfWeek = new Date(currentDate);
    endOfWeek.setUTCHours(23, 59, 59, 999);

    // Correct model usage and date comparison
    const popularReviews = await reviewSchema.aggregate([
      {
        $match: {
          createdAt: { 
            $gte: startOfWeek, 
            $lte: endOfWeek 
          },
        },
      },
      // { $addFields: { likeCount: { $size: "$likes" } } },
      // { $sort: { likeCount: -1 } },
      // { $limit: 6 },
    ]);

    res.status(200).json({
      message: "success",
      data: popularReviews,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error: error.message });
  }
};

export { getNewReviews,getPopularOfTheWeek };
