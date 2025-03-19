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

export { getPopularLists };
