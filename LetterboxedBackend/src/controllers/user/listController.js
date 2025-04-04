import listSchema from "../../models/schema/listSchema.js";
import CustomError from "../../utils/customeError.js";

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

const getListById = async (req, res, next) => {
  const { listId } = req.params;
  if (!listId) {
    return next(new CustomError("no id found", 400));
  }
  const list = await listSchema
    .findById(listId)
    .populate("user", "userName")
    .populate("movies", "title smallPoster")
    .populate("comments.user", "userName");
  if (!list) {
    return next(new CustomError("no list found on this Id", 400));
  }
  res.status(200).json({
    data: list,
  });
};

const likeALsit = async (req, res, next) => {
  const userId = req.user?.id;
  const { listId } = req.body;

  if (!userId || !listId) {
    return next(new CustomError("No user or list found", 400));
  }

  const movieList = await listSchema.findById(listId);

  if (!movieList) {
    return res.status(404).json({ message: "Movie list not found" });
  }

  movieList.likes = movieList.likes.filter((like) => like !== null);

  const userIdString = userId.toString();
  const existingLikeIndex = movieList.likes.findIndex(
    (like) => like?.user?.toString() === userIdString
  );

  if (existingLikeIndex === -1) {
    movieList.likes.push({
      user: userId,
      likedAt: new Date(),
    });
  } else {
    movieList.likes.splice(existingLikeIndex, 1);
  }

  await movieList.save();

  return res.status(200).json({
    message: "Like updated successfully",
    likesCount: movieList.likes.length,
    isLiked: existingLikeIndex === -1,
  });
};

const isUserLiked = async (req, res, next) => {
  const userId = req.user?._id || req.user?.id;
  const { listId } = req.body;

  if (!userId) {
    return next(new CustomError("User not authenticated", 401));
  }

  if (!listId) {
    return next(new CustomError("List ID is required", 400));
  }

  const movieList = await listSchema.findById(listId);

  if (!movieList) {
    return res.status(404).json({ message: "Movie list not found" });
  }

  const isLiked = movieList.likes.some(
    (like) => like?.user?.toString() === userId.toString()
  );

  return res.status(200).json({
    isLiked: isLiked,
  });
};

const createList = async (req, res) => {
  const { title, description, movies, isPublic } = req.body;

  if (!req.user || !req.user.id) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Please login to create a list",
    });
  }

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });
  }

  if (!movies || !Array.isArray(movies) || movies.length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least one movie is required",
    });
  }

  const newList = new listSchema({
    title,
    description: description || "",
    user: req.user.id,
    movies,
    isPublic: isPublic !== undefined ? isPublic : true,
  });

  const savedList = await newList.save();

  const populatedList = await listSchema
    .findById(savedList._id)
    .populate("user", "username email")
    .populate("movies", "title releaseDate");

  return res.status(201).json({
    success: true,
    message: "Movie list created successfully",
    data: populatedList,
  });
};

const addCommentToList = async (req, res) => {
  const { listId, text } = req.body;
  const userId = req.user.id;

  if (!listId || !text) {
    return res.status(400).json({
      success: false,
      message: "Review ID and comment text are required",
    });
  }

  const list = await listSchema.findById(listId);
  if (!list) {
    return res.status(404).json({
      success: false,
      message: "list not found",
    });
  }

  const newComment = {
    user: userId,
    comment:text,
    createdAt: new Date(),
  };

  list.comments.push(newComment);

  const updatedList = await list.save();

  await updatedList.populate("comments.user", "username");

  res.status(201).json({
    success: true,
    message: "Comment added successfully",
    data: updatedList,
  });
};

export {
  getPopularLists,
  getPopOfWeek,
  getRecentlyLiked,
  getListById,
  likeALsit,
  isUserLiked,
  createList,
  addCommentToList
};
