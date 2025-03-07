import express from 'express'
import trycatch from '../../middlewares/tryCatch.js'
import { getNewMovies, getOscarsMovies } from '../../controllers/user/movieController.js';

const routes = express.Router();

routes.get('/movies',trycatch(getNewMovies))
.get('/oscars',trycatch(getOscarsMovies))

export default routes