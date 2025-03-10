import express from 'express'
import trycatch from '../../middlewares/tryCatch.js'
import { getNewMovies, getOscarsMovies } from '../../controllers/user/movieController.js';
import { getNewReviews, getPopularOfTheWeek } from '../../controllers/user/reviewController.js';

const routes = express.Router();

routes.get('/movies',trycatch(getNewMovies))
.get('/oscars',trycatch(getOscarsMovies))
.get('/newReviews',trycatch(getNewReviews))
.get('/popularReview',trycatch(getPopularOfTheWeek))

export default routes