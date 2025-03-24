import express from "express";
import trycatch from "../../middlewares/tryCatch.js";
import {
  getMovieById,
  getNewMovies,
  getOscarsMovies,
  getPopOfTheWeek,
  likeMovie,
  watchMovie,
} from "../../controllers/user/movieController.js";
import {
  avgRatingAndCount,
  getNewReviews,
  getPopReviewById,
  getPopularOfTheWeek,
} from "../../controllers/user/reviewController.js";
import { getPopularLists } from "../../controllers/user/listController.js";
import { getNewNews } from "../../controllers/user/newsController.js";
import { getPopReviwers } from "../../controllers/user/memberController.js";
import { verifyUser } from "../../middlewares/authentication.js";

const routes = express.Router();

routes
  .get("/movies", trycatch(getNewMovies))
  .get("/oscars", trycatch(getOscarsMovies))
  .get("/newReviews", trycatch(getNewReviews))
  .get("/popularReview", trycatch(getPopularOfTheWeek))
  .get("/popularLists", trycatch(getPopularLists))
  .get("/getNews", trycatch(getNewNews))
  .get("/popularMovies", trycatch(getPopOfTheWeek))
  .get("/movieById/:id", trycatch(getMovieById))
  .get("/avgRating/:id", trycatch(avgRatingAndCount))
  .get("/popReviewById/:id", trycatch(getPopReviewById))
  .get("/getTopReviwers", trycatch(getPopReviwers))
  .post('/likeMovie',verifyUser,trycatch(likeMovie))
  .post('/watchMovie',verifyUser,trycatch(watchMovie))

export default routes;
