import listSchema from "../../models/schema/listSchema.js";

const getALlLists = async (req, res) => {
  const lists = await listSchema
    .find()
    .populate("user", "userName")
    .populate("movies", "title smallPoster");
  res.status(200).json({
    data: lists,
  });
};
const getListById = async (req, res) => {
  const lists = await listSchema.findById(req.params.id);
  res.status(200).json({
    data: lists,
  });
};
const getListsByUser = async (req, res) => {
  const lists = await listSchema.find({ user: req.params.id });
  res.status(200).json({
    data: lists,
  });
};

export { getALlLists, getListById, getListsByUser };
