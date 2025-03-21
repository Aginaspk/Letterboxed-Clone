import Review from "../../models/schema/reviewSchema.js";
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
      $project: {
        _id: "$userInfo._id",
        userName: "$userInfo.userName",
        profilePic: "$userInfo.profilePic",
        totalLikes: 1,
        reviewCount: 1,
      },
    },
  ]);

  res.status(200).json({
    data: popularReviewersByLikes,
  });
};

export { getPopReviwers };
