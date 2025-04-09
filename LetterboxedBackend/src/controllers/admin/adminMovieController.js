import { joiMovieScema } from "../../models/joischema/validation.js";
import movieSchema from "../../models/schema/movieSchema.js";
import CustomError from "../../utils/customeError.js";

const addMovie = async (req, res, next) => {
  const { value, error } = joiMovieScema.validate(req.body);
  if (error) {
    return next(new CustomError(error.details[0].message, 400));
  }

  // Handle single small poster image
  let smallPosterPath = "";
  if (req.files?.smallPoster) {
    smallPosterPath = req.files.smallPoster[0].path;
  }

  // Handle single big poster image
  let bigPosterPath = "";
  if (req.files?.bigPoster) {
    bigPosterPath = req.files.bigPoster[0].path;
  }

  const newMovie = new movieSchema({
    ...value,
    smallPoster: smallPosterPath,
    bigPoster: bigPosterPath,
    genre: Array.isArray(req.body.genre)
      ? req.body.genre
      : req.body.genre.split(",").map((g) => g.trim()),
    cast: Array.isArray(req.body.cast)
      ? req.body.cast
      : req.body.cast?.split(",").map((c) => c.trim()) || [],
  });

  if (!newMovie) {
    return next(new CustomError("movie could not be created", 500));
  }

  await newMovie.save();
  res.status(201).json({
    message: "Movie created successfully",
  });
};

const updateMovie = async (req, res) => {
  const { id } = req.params; // Movie ID from URL
  const movie = await movieSchema.findById(id);
  if (!movie) {
    return next(new CustomError("Movie not found", 404));
  }

  // Prepare update data with text fields
  const updateData = {
    ...req.body,
    genre: req.body.genre
      ? req.body.genre.split(",").map((g) => g.trim())
      : movie.genre,
    cast: req.body.cast
      ? req.body.cast.split(",").map((c) => c.trim())
      : movie.cast,
  };

  // Handle image updates (optional)
  if (req.files?.smallPoster) {
    updateData.smallPoster = req.files.smallPoster[0].path; // New Cloudinary URL
  }
  if (req.files?.bigPoster) {
    updateData.bigPoster = req.files.bigPoster[0].path; // New Cloudinary URL
  }

  // Update the movie in the database
  const updatedMovie = await movieSchema.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    message: "Movie updated successfully",
    movie: updatedMovie,
  });
};

export { addMovie,updateMovie };
