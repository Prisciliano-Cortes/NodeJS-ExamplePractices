import { Router } from "express";
import { MovieController } from "../controllers/movies.js";

export const routerMovie = Router()

routerMovie.get('/', MovieController.getAll)

routerMovie.get('/:id', MovieController.getById)

routerMovie.post('/', MovieController.create)

routerMovie.delete('/:id', MovieController.delete)

routerMovie.patch('/:id', MovieController.update)