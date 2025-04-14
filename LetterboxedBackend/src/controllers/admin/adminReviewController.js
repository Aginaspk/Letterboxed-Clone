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

const removeReview = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new CustomError("Invalid Review ID", 400));
  }

  const review = await reviewSchema.findById(id);
  if (!review) {
    return next(new CustomError("review not found", 404));
  }
  await reviewSchema.findByIdAndDelete(id);

  res.status(200).json({
    message: "review deleted successfully",
  });
};

export { getAllReviews, getRevById, getRevByMovie, getRevByUser,removeReview };
