import express from "express";
import trycatch from "../../middlewares/tryCatch.js";
import {
  getIntraById,
  getMovieById,
  getNewMovies,
  getOscarsMovies,
  getPopOfTheWeek,
  likeMovie,
  rateMovie,
  watchlistMovie,
  watchMovie,
} from "../../controllers/user/movieController.js";
import {
  avgRatingAndCount,
  getNewReviews,
  getPopReviewById,
  getPopularOfTheWeek,
} from "../../controllers/user/reviewController.js";
import { getListById, getPopOfWeek, getPopularLists, getRecentlyLiked, isUserLiked, likeALsit } from "../../controllers/user/listController.js";
import { getNewNews } from "../../controllers/user/newsController.js";
import { getAllMemebrs, getPopMemberOfTheWeek, getPopReviwers } from "../../controllers/user/memberController.js";
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
  .get("/getToMemebrOfWeek", trycatch(getPopMemberOfTheWeek))
  .get("/getAllMembers", trycatch(getAllMemebrs))
  .get('/getPopOfWeek',trycatch(getPopOfWeek))
  .get('/getRecentlyLikedList',trycatch(getRecentlyLiked))
  .get('/getListById/:listId',trycatch(getListById))
  .post('/likeMovie',verifyUser,trycatch(likeMovie))
  .post('/getIntra',verifyUser,trycatch(getIntraById))
  .post('/watchMovie',verifyUser,trycatch(watchMovie))
  .post('/rateMovie',verifyUser,trycatch(rateMovie))
  .post('/watchlistMovie',verifyUser,trycatch(watchlistMovie))
  .post('/likeList',verifyUser,trycatch(likeALsit))
  .post('/isLiked',verifyUser,trycatch(isUserLiked))

export default routes;
