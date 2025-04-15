import mongoose from "mongoose";
import movieanduserSchema from "../../models/schema/movieanduserSchema.js";
import reviewSchema from "../../models/schema/reviewSchema.js";
import Review from "../../models/schema/reviewSchema.js";
import userSchema from "../../models/schema/userSchema.js";
import CustomError from "../../utils/customeError.js";

const getPopReviwers = async (req, res) => {
  const popularReviewersByLikes = await Review.aggregate([
    {
      $project: {
        user: 1,
        likesCount: { $size: "$likes" },
      },
    },
    {
      $group: {
        _id: "$user",
        totalLikes: { $sum: "$likesCount" },
        reviewCount: { $sum: 1 },
      },
    },
    { $sort: { totalLikes: -1 } },
    { $limit: 10 },
    {
      $addFields: {
        userObjId: { $toObjectId: "$_id" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userObjId",
        foreignField: "_id",
        as: "userInfo",
      },
    },
    { $unwind: "$userInfo" },
    {
      $lookup: {
        from: "movieuserinteractions",
        localField: "userObjId",
        foreignField: "user",
        as: "interactions",
      },
    },
    {
      $project: {
        _id: "$userInfo._id",
        userName: "$userInfo.userName",
        profilePic: "$userInfo.profilePic",
        totalLikes: 1,
        reviewCount: 1,
        totalWatched: {
          $size: {
            $filter: {
              input: "$interactions",
              cond: { $ne: ["$$this.watchedAt", null] },
            },
          },
        },
      },
    },
  ]);

  res.status(200).json({
    data: popularReviewersByLikes,
  });
};

const getPopMemberOfTheWeek = async (req, res) => {
  const currentDate = new Date();
  const startOfWeek = new Date(currentDate);
  startOfWeek.setUTCDate(currentDate.getUTCDate() - 7);
  startOfWeek.setUTCHours(0, 0, 0, 0);
  const endOfWeek = new Date(currentDate);
  endOfWeek.setUTCHours(23, 59, 59, 999);
  const popularReviewersByLikes = await Review.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfWeek, $lte: endOfWeek },
      },
    },
    {
      $project: {
        user: 1,
        likesCount: { $size: "$likes" },
      },
    },
    {
      $group: {
        _id: "$user",
        totalLikes: { $sum: "$likesCount" },
        reviewCount: { $sum: 1 },
      },
    },
    { $sort: { totalLikes: -1 } },
    { $limit: 10 },
    {
      $addFields: {
        userObjId: { $toObjectId: "$_id" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userObjId",
        foreignField: "_id",
        as: "userInfo",
      },
    },
    { $unwind: "$userInfo" },
    {
      $lookup: {
        from: "movieuserinteractions",
        localField: "userObjId",
        foreignField: "user",
        as: "interactions",
      },
    },
    {
      $project: {
        _id: "$userInfo._id",
        userName: "$userInfo.userName",
        profilePic: "$userInfo.profilePic",
        totalLikes: 1,
        reviewCount: 1,
        totalWatched: {
          $size: {
            $filter: {
              input: "$interactions",
              cond: { $ne: ["$$this.watchedAt", null] },
            },
          },
        },
      },
    },
  ]);

  res.status(200).json({
    data: popularReviewersByLikes,
  });
};

const getAllMemebrs = async (req, res) => {
  const members = await userSchema.find({ isAdmin: false });

  res.status(200).json({
    data: members,
  });
};

const toggleFollowUser = async (req, res, next) => {
  const { userId } = req.params;
  const currentUserId = req.user.id;

  if (userId === currentUserId) {
    return next(new CustomError("You cannot follow yourself", 400));
  }

  const currentUser = await userSchema.findById(currentUserId);
  const targetUser = await userSchema.findById(userId);

  if (!targetUser) {
    return next(new CustomError("User to follow not found", 404));
  }
  if (!currentUser) {
    return next(new CustomError("Current user not found", 404));
  }

  const isFollowing = currentUser.following.includes(userId);

  if (isFollowing) {
    await userSchema.findByIdAndUpdate(
      currentUserId,
      { $pull: { following: userId } },
      { new: true }
    );
    await userSchema.findByIdAndUpdate(
      userId,
      { $pull: { followers: currentUserId } },
      { new: true }
    );
    return res.status(200).json({ message: "User unfollowed successfully" });
  } else {
    await userSchema.findByIdAndUpdate(
      currentUserId,
      { $push: { following: userId } },
      { new: true }
    );
    await userSchema.findByIdAndUpdate(
      userId,
      { $push: { followers: currentUserId } },
      { new: true }
    );
    return res.status(200).json({ message: "User followed successfully" });
  }
};

const getActivity = async (req, res, next) => {
  const userId = req.params.id;

  const activities = await movieanduserSchema
    .find({ user: userId })
    .sort({ updatedAt: -1 })
    .limit(4)
    .populate("movie", "title smallPoster releaseDate")
    .select("watchedAt likedAt isInWatchlist rating updatedAt")
    .lean();

  res.status(200).json({
    success: true,
    data: activities,
  });
};
const getReview = async (req, res, next) => {
  const userId = req.params.id;

  const reviews = await reviewSchema
    .find({ user: userId })
    .sort({ updatedAt: -1 })
    .limit(4)
    .populate("movie", "title smallPoster releaseDate")
    .lean();

  res.status(200).json({
    success: true,
    data: reviews,
  });
};
const getUser = async (req, res, next) => {
  const userId = req.params.id;

  const user = await userSchema.findById(userId);

  res.status(200).json({
    success: true,
    data: user,
  });
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { userName, email, favorites } = req.body;



  if (!userName && !email && !favorites) {
    return res.status(400).json({
      success: false,
      message:
        "At least one field (userName, email, or favorites) is required to update",
    });
  }
 
  const updateData = {};
  if (userName) updateData.userName = userName;
  if (email) updateData.email = email;
  if (favorites) updateData.favorites = favorites;

  const updatedUser = await userSchema.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true, runValidators: true }
  )
    .select("userName email favorites")
    .lean();

  if (!updatedUser) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({
    success: true,
    data: updatedUser,
  });
};

export {
  getPopReviwers,
  getPopMemberOfTheWeek,
  getAllMemebrs,
  toggleFollowUser,
  getActivity,
  getReview,
  getUser,
  updateUser
};
