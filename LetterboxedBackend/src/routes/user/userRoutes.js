import express from "express";
import trycatch from "../../middlewares/tryCatch.js";
import {
  getNewMovies,
  getOscarsMovies,
  getPopOfTheWeek,
} from "../../controllers/user/movieController.js";
import {
  getNewReviews,
  getPopularOfTheWeek,
} from "../../controllers/user/reviewController.js";
import { getPopularLists } from "../../controllers/user/listController.js";
import { getNewNews } from "../../controllers/user/newsController.js";

const routes = express.Router();

routes
  .get("/movies", trycatch(getNewMovies))
  .get("/oscars", trycatch(getOscarsMovies))
  .get("/newReviews", trycatch(getNewReviews))
  .get("/popularReview", trycatch(getPopularOfTheWeek))
  .get("/popularLists", trycatch(getPopularLists))
  .get("/getNews", trycatch(getNewNews))
  .get('/popularMovies',trycatch(getPopOfTheWeek))

export default routes;
