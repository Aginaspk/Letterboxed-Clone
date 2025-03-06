import movieSchema from "../../models/schema/movieSchema.js";

const getAllMovies = async (req, res) => {
  const allProducts = await movieSchema.find().sort({ createdAt: -1 }).limit(6);

  res.status(200).json({
    message: "All movies fetched successfully",
    data: allProducts,
  });   
};

export {getAllMovies}