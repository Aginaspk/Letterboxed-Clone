import movieanduserSchema from "../../models/schema/movieanduserSchema.js";
import movieSchema from "../../models/schema/movieSchema.js";

const getNewMovies = async (req, res) => {
  const newMovies = await movieSchema.find().sort({ createdAt: -1 }).limit(6);

  res.status(200).json({
    message: "New movies fetched successfully",
    data: newMovies,
  });
};

const getOscarsMovies = async (req, res) => {
  const oscarsMovies = await movieSchema.find({ isOscar: true });

  res.status(200).json({
    message: "Oscars movies fetched successfully",
    data: oscarsMovies,
  });
};



const getPopOfTheWeek = async (req, res) => {
  const currentDate = new Date();
  const startOfWeek = new Date(currentDate);
  startOfWeek.setUTCDate(currentDate.getUTCDate() - 7);
  startOfWeek.setUTCHours(0, 0, 0, 0);
  const endOfWeek = new Date(currentDate);
  endOfWeek.setUTCHours(23, 59, 59, 999);

  const popMovies = await movieanduserSchema.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            {
              $gte: [
                { $dateFromString: { dateString: "$likedAt" } },
                startOfWeek,
              ],
            },
            {
              $lte: [
                { $dateFromString: { dateString: "$likedAt" } },
                endOfWeek,
              ],
            },
          ],
        },
      },
    },
    {
      $group: {
        _id: "$movie",
        likeCount: { $sum: 1 },
        viewers: { $addToSet: "$user" },
      },
    },
    { $sort: { likeCount: -1 } },
    { $limit: 8 },
    {
      $addFields: {
        viewCount: { $size: "$viewers" },
        movieObjId: { $toObjectId: "$_id" },
        
      },
    },
    {
      $lookup: {
        from: "filims",
        localField: "movieObjId",
        foreignField: "_id",
        as: "movieDetails",
      },
    }, 
    { $unwind: "$movieDetails" },
    {
      $project: {
        _id: "$movieDetails._id",
        title: "$movieDetails.title",
        smallPoster: "$movieDetails.smallPoster",
        likeCount: 1,
        viewCount: 1,
      },
    },
  ]);

  res.status(200).json({
    message: "Most liked movies of the week",
    data: popMovies,
  });
};

export { getNewMovies, getOscarsMovies, getPopOfTheWeek };
