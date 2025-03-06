import express from 'express'
import trycatch from '../../middlewares/tryCatch.js'
import { getAllMovies } from '../../controllers/user/movieController.js';

const routes = express.Router();

routes.get('/movies',trycatch(getAllMovies))

export default routes