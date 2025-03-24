import movieanduserSchema from "../../models/schema/movieanduserSchema.js";
import movieSchema from "../../models/schema/movieSchema.js";
import CustomError from "../../utils/customeError.js";

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

// const getPopOfTheWeek = async (req, res) => {
//   const currentDate = new Date();
//   const startOfWeek = new Date(currentDate);
//   startOfWeek.setUTCDate(currentDate.getUTCDate() - 7);
//   startOfWeek.setUTCHours(0, 0, 0, 0);
//   const endOfWeek = new Date(currentDate);
//   endOfWeek.setUTCHours(23, 59, 59, 999);

//   const popMovies = await movieanduserSchema.aggregate([
//     {
//       $match: {
//         $expr: {
//           $and: [
//             { $gte: ["$likedAt", startOfWeek] },
//             { $lte: ["$likedAt", endOfWeek] },
//           ],
//         },
//       },
//     },
//     {
//       $group: {
//         _id: "$movie",
//         likeCount: { $sum: 1 },
//         viewers: { $addToSet: "$user" },
//       },
//     },
//     { $sort: { likeCount: -1 } },
//     { $limit: 8 },
//     {
//       $addFields: {
//         viewCount: { $size: "$viewers" },
//         movieObjId: { $toObjectId: "$_id" },
//       },
//     },
//     {
//       $lookup: {
//         from: "filims",
//         localField: "movieObjId",
//         foreignField: "_id",
//         as: "movieDetails",
//       },
//     },
//     { $unwind: "$movieDetails" },
//     {
//       $project: {
//         _id: "$movieDetails._id",
//         title: "$movieDetails.title",
//         smallPoster: "$movieDetails.smallPoster",
//         likeCount: 1,
//         viewCount: 1,
//       },
//     },
//   ]);

//   res.status(200).json({
//     message: "Most liked movies of the week",
//     data: popMovies,
//   });
// };

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
        $or: [
          {
            $expr: {
              $and: [
                { $gte: ["$likedAt", startOfWeek] },
                { $lte: ["$likedAt", endOfWeek] },
              ],
            },
          },
          {
            $expr: {
              $and: [
                { $gte: ["$watchedAt", startOfWeek] },
                { $lte: ["$watchedAt", endOfWeek] },
              ],
            },
          },
        ],
      },
    },
    {
      $group: {
        _id: "$movie",
        likeCount: {
          $sum: { $cond: [{ $ne: ["$likedAt", null] }, 1, 0] },
        },
        viewers: {
          $addToSet: { $cond: [{ $ne: ["$watchedAt", null] }, "$user", null] },
        },
      },
    },
    {
      $match: {
        $or: [{ likeCount: { $gt: 0 } }, { viewers: { $ne: [null] } }],
      },
    },
    { $sort: { likeCount: -1 } },
    { $limit: 8 },
    {
      $addFields: {
        viewCount: {
          $size: {
            $filter: { input: "$viewers", cond: { $ne: ["$$this", null] } },
          },
        },
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
    message: "Most popular movies of the week",
    data: popMovies,
  });
};

const getMovieById = async (req, res) => {
  const { id } = req.params;
  const movie = await movieSchema.findById(id);

  res.status(200).json({
    data: movie,
  });
};

const likeMovie = async (req, res, next) => {
  const user = req.user;
  const movieId = req.body.movieId;

  if (!movieId || !user) {
    return next(new CustomError("no movie and user found", 400));
  }

  let interaction = await movieanduserSchema.findOne({
    user: user.id,
    movie: movieId,
  });

  if (interaction) {
    if (interaction.likedAt) {
      interaction.likedAt = null;
      await interaction.save();
      return res.status(200).json({
        message: "Movie unliked successfully",
        data: interaction,
      });
    } else {
      interaction.likedAt = new Date();
      await interaction.save();
      return res.status(200).json({
        message: "Movie liked successfully",
        data: interaction,
      });
    }
  } else {
    interaction = new movieanduserSchema({
      user: user.id,
      movie: movieId,
      likedAt: new Date(),
      watchedAt: null,
      isInWatchlist: false,
      rating: 0,
    });
    await interaction.save();
    return res.status(201).json({
      message: "Movie liked successfully",
      data: interaction,
    });
  }
};

const watchMovie = async (req, res, next) => {
  const user = req.user;
  const movieId = req.body.movieId;

  if (!movieId || !user) {
    return next(new CustomError("no movie and user found", 400));
  }
  let interaction = await movieanduserSchema.findOne({
    user: user.id,
    movie: movieId,
  });

  if (interaction) {
    if (interaction.watchedAt) {
      interaction.watchedAt = null;
      await interaction.save();
      return res.status(200).json({
        message: "Movie marked as unwatched successfully",
        data: interaction,
      });
    } else {
      interaction.watchedAt = new Date();
      await interaction.save();
      return res.status(200).json({
        message: "Movie marked as watched successfully",
        data: interaction,
      });
    }
  } else {
    interaction = new movieanduserSchema({
      user: user.id,
      movie: movieId,
      watchedAt: new Date(),
      likedAt: null,
      isInWatchlist: false,
      rating: 0,
    });
    await interaction.save();
    return res.status(201).json({
      message: "Movie marked as watched successfully",
      data: interaction,
    });
  }
};

const watchlistMovie = async (req, res, next) => {
  const user = req.user;
  const movieId = req.body.movieId;

  if (!movieId || !user) {
    return next(new CustomError("no movie and user found", 400));
  }
  let interaction = await movieanduserSchema.findOne({
    user: user.id,
    movie: movieId,
  });

  if (interaction) {
    if (interaction.isInWatchlist) {
      interaction.isInWatchlist = false;
      await interaction.save();
      return res.status(200).json({
        message: "Movie removed from watchlist successfully",
        data: interaction,
      });
    } else {
      interaction.isInWatchlist = true;
      await interaction.save();
      return res.status(200).json({
        message: "Movie added to watchlist successfully",
        data: interaction,
      });
    }
  } else {
    interaction = new movieanduserSchema({
      user: user.id,
      movie: movieId,
      watchedAt: null,
      likedAt: null,
      isInWatchlist: true,
      rating: 0,
    });
    await interaction.save();
    return res.status(201).json({
      message: "Movie added to watchlist successfully",
      data: interaction,
    });
  }
};

const rateMovie = async (req, res, next) => {
  console.log(req.body)
  const user = req.user;
  const movieId = req.body.movieId;
  const {rating} = req.body;

  if (!movieId || !user || !rating) {
    return next(new CustomError("no movie and user and rating found", 400));
  }
  let interaction = await movieanduserSchema.findOne({
    user: user.id,
    movie: movieId,
  });

  if (interaction) {
    // Document exists, update rating
    interaction.rating = rating;
    await interaction.save();
    return res.status(200).json({
      message: `Movie rating updated to ${rating} successfully`,
      data: interaction,
    });
  } else {
    // Document doesn’t exist, create with rating
    interaction = new movieanduserSchema({
      user: userId,
      movie: movieId,
      watchedAt: null,
      likedAt: null,
      isInWatchlist: false,
      rating: rating,
    });
    await interaction.save();
    return res.status(201).json({
      message: `Movie rated ${rating} successfully`,
      data: interaction,
    });
  }
};

const getIntraById = async (req, res, next) => {
  const user = req.user;
  const movieId = req.body.movieId;

  if (!movieId || !user) {
    return next(new CustomError("no movie and user found", 400));
  }

  let intra = await movieanduserSchema.findOne({
    user: user.id,
    movie: movieId,
  });

  if (!intra) {
    intra = new movieanduserSchema({
      user: user.id,
      movie: movieId,
      watchedAt: null,
      likedAt: null,
      isInWatchlist: false,
      rating: 0,
    });
    await intra.save();
  }

  res.status(200).json({
    intra: intra,
  });
};

export {
  getNewMovies,
  getOscarsMovies,
  getPopOfTheWeek,
  getMovieById,
  likeMovie,
  watchMovie,
  getIntraById,
  watchlistMovie,
  rateMovie
};
