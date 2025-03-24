import listSchema from "../../models/schema/listSchema.js";

const getPopularLists = async (req, res) => {
  const popularList = await listSchema
    .find()
    .sort({ likes: -1 })
    .populate("user", "userName")
    .populate("movies", "title smallPoster")
    .limit(3);

  res.status(200).json({
    messgae: "Popular Lists",
    data: popularList,
  });
};

const getPopOfWeek = async (req, res) => {
  const currentDate = new Date();
  const startOfWeek = new Date(currentDate);
  startOfWeek.setUTCDate(currentDate.getUTCDate() - 7);
  startOfWeek.setUTCHours(0, 0, 0, 0);
  const endOfWeek = new Date(currentDate);
  endOfWeek.setUTCHours(23, 59, 59, 999);

  const popularLists = await listSchema.aggregate([
    { $unwind: "$likes" },
    {
      $match: {
        "likes.likedAt": {
          $gte: startOfWeek,
          $lte: endOfWeek,
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        title: { $first: "$title" },
        description: { $first: "$description" },
        user: { $first: "$user" },
        movies: { $first: "$movies" },
        likeCount: { $sum: 1 },
        likes: { $push: "$likes" },
      },
    },
    { $sort: { likeCount: -1 } },
    { $limit: 3 },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $lookup: {
        from: "filims",
        localField: "movies",
        foreignField: "_id",
        as: "movies",
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        user: { _id: 1, userName: 1 },
        movies: { _id: 1, title: 1, smallPoster: 1 },
        likeCount: 1,
        likes: 1,
      },
    },
  ]);

  res.status(200).json({
    success: true,
    data: popularLists,
    message: "Popular movie lists for this week retrieved successfully",
  });
};

const getRecentlyLiked = async (req, res) => {
  const recentlyLikedLists = await listSchema.aggregate([
    { $unwind: "$likes" },
    {
      $addFields: {
        "likes.likedAt": { $toDate: "$likes.likedAt" },
      },
    },
    { $sort: { "likes.likedAt": -1 } },
    {
      $group: {
        _id: "$_id",
        title: { $first: "$title" },
        description: { $first: "$description" },
        user: { $first: "$user" },
        movies: { $first: "$movies" },
        mostRecentLike: { $first: "$likes" },
        likes: { $push: "$likes" },
      },
    },
    { $sort: { "mostRecentLike.likedAt": -1 } },
    { $limit: 10 },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $lookup: {
        from: "filims", 
        localField: "movies",
        foreignField: "_id",
        as: "movies",
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        user: { _id: 1, userName: 1 },
        movies: { _id: 1, title: 1, smallPoster: 1 },
        mostRecentLike: 1,
        likes: 1, 
      },
    },
  ]);

  console.log("Recently Liked Lists:", recentlyLikedLists);

  if (recentlyLikedLists.length === 0) {
    return res.status(200).json({
      success: true,
      data: [],
      message: "No recently liked movie lists found",
    });
  }

  res.status(200).json({
    success: true,
    data: recentlyLikedLists,
    message: "Recently liked movie lists retrieved successfully",
  });
};

export { getPopularLists, getPopOfWeek, getRecentlyLiked };
