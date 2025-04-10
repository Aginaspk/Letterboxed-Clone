import reviewSchema from "../../models/schema/reviewSchema.js";

const getAllReviews = async (req, res) => {
  const reviews = await reviewSchema
    .find()
    .populate("user", "userName")
    .populate("movie", "title smallPoster");
  res.status(200).json({
    data: reviews,
  });
};

const getRevById = async (req, res) => {
  const rev = await reviewSchema.findById(req.params.id);
  res.status(200).json({
    data: rev,
  });
};
const getRevByUser = async (req, res) => {
  const rev = await reviewSchema.find({ user: req.params.id });
  res.status(200).json({
    data: rev,
  });
};
const getRevByMovie = async (req, res) => {
  const rev = await reviewSchema.find({ movie: req.params.id });
  res.status(200).json({
    data: rev,
  });
};

export { getAllReviews, getRevById, getRevByMovie, getRevByUser };
