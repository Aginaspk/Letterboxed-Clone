import listSchema from "../../models/schema/listSchema.js";
import movieSchema from "../../models/schema/movieSchema.js";
import reviewSchema from "../../models/schema/reviewSchema.js";
import userSchema from "../../models/schema/userSchema.js";
import CustomError from "../../utils/customeError.js";

const searchAllCollections = async (req, res) => {
  const { searchText } = req.params;
  if (!searchText || searchText.trim() === "") {
    return res.status(400).json({ message: "Search text is required" });
  }

  const regex = new RegExp(searchText, "i");
  const matchingMovies = await movieSchema.find({ title: regex }).select("_id");
  const movieIds = matchingMovies.map((movie) => movie._id);

  const [users, films, lists, reviews] = await Promise.all([
    userSchema
      .find({ userName: regex })
      .select("userName profilePic _id")
      .limit(10),
    movieSchema
      .find({ title: regex })
      .select("title releaseYear director description smallPoster _id ")
      .limit(10),
    listSchema
      .find({ title: regex })
      .populate("user", "userName profilePic")
      .populate("movies", "smallPoster")
      .limit(10),
    reviewSchema
      .find({ movie: { $in: movieIds } })
      .populate("user", "userName profilePic")
      .populate("movie", "smallPoster releaseYear title")
      .limit(10),
  ]);

  const results = {
    users: users.map((user) => ({
      id: user._id,
      userName: user.userName,
      profilePic: user.profilePic || null,
      type: "user",
    })),
    films: films.map((film) => ({
      id: film._id,
      title: film.title,
      releaseYear: film.releaseYear,
      director: film.director,
      description: film.description,
      smallPoster: film.smallPoster,
      type: "film",
    })),
    lists: lists,
    reviews: reviews,
  };

  res.status(200).json({
    data: results,
    total: {
      users: users.length,
      films: films.length,
      lists: lists.length,
    },
  });
};

const searchMovie = async (req, res, next) => {
  const { searchText } = req.params;
  if (!searchText || searchText.trim() === "") {
    return next(new CustomError("Search text is required", 400));
  }
  const regex = new RegExp(searchText, "i");
  const movie = await movieSchema
    .find({ title: regex })
    .select("title releaseYear director _id ");

  if (!movie) {
    return res.status(200).json({
      data: {},
    });
  }

  res.status(200).json({
    data: movie,
  });
};

export { searchAllCollections, searchMovie };
