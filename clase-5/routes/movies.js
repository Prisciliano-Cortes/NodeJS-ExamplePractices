import { Router } from "express";
import { MovieController } from "../controllers/movies.js";

export const createMovieRouter = ({ movieModel }) => {
    const routerMovie = Router()

    const movieController = new MovieController({ movieModel })

    routerMovie.get('/', movieController.getAll)

    routerMovie.get('/:id', movieController.getById)

    routerMovie.post('/', movieController.create)

    routerMovie.delete('/:id', movieController.delete)

    routerMovie.patch('/:id', movieController.update)

    return routerMovie
}