import { joiMovieScema } from "../../models/joischema/validation.js";
import movieSchema from "../../models/schema/movieSchema.js";
import CustomError from "../../utils/customeError.js";

const getAllFilms = async (req, res) => {
  const films = await movieSchema.find();
  res.status(200).json({
    data: films,
  });
};
const getFilmById = async (req, res) => {
  const film = await movieSchema.findById(req.params.id);
  res.status(200).json({
    data: film,
  });
};

const addMovie = async (req, res, next) => {
  const { value, error } = joiMovieScema.validate(req.body);
  if (error) {
    return next(new CustomError(error.details[0].message, 400));
  }

  let smallPosterPath = "";
  if (req.files?.smallPoster) {
    smallPosterPath = req.files.smallPoster[0].path;
  }

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
  const { id } = req.params;
  const movie = await movieSchema.findById(id);
  if (!movie) {
    return next(new CustomError("Movie not found", 404));
  }

  const updateData = {
    ...req.body,
    genre: req.body.genre
      ? req.body.genre.split(",").map((g) => g.trim())
      : movie.genre,
    cast: req.body.cast
      ? req.body.cast.split(",").map((c) => c.trim())
      : movie.cast,
  };

  if (req.files?.smallPoster) {
    updateData.smallPoster = req.files.smallPoster[0].path;
  }
  if (req.files?.bigPoster) {
    updateData.bigPoster = req.files.bigPoster[0].path;
  }

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

export { addMovie, updateMovie,getAllFilms,getFilmById };
