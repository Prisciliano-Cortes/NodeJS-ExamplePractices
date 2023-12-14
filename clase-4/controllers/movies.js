import { validateMovie, validatePartialMovie } from "../schema/movies.js"
import { MovieModel } from '../models/local-database/movie.js';

export class MovieController {
    static async getAll(req, res) {
        const { genre } = req.query

        try {
            const movies = await MovieModel.getAll({ genre })
            
            res.json(movies)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static async getById(req, res) { //*** id: Path-to-regexp  */
        const { id } = req.params
    
        const movie = await MovieModel.getById({ id })
    
        if ( !movie ) {
            return res.status(404).json({
                message: 'Movie not found'
            })
        }
    
        res.json(movie)
    }

    static async create(req, res) {
        const result = validateMovie(req.body)
     
        if (result.error) {
            return res.status(400).json({
                error: JSON.parse(result.error.message)
            })
        }
     
        const newMovie = await MovieModel.create({input: result.data})
     
        res.status(201).json(newMovie)
    }

    static async delete(req, res) {
        const { id } = req.params
    
        const result = await MovieModel.delete({ id })
    
        if ( result === false ) {
            return res.status(404).json({
                message: 'Movie not found'
            })
        }
    
        return res.json({
            message: 'Movie deleted'
        })
    }

    static async update(req, res) {
        const { id } = req.params
    
        const result = validatePartialMovie(req.body)
    
        if ( !result.success ) {
            return res.status(400).json({
                error: JSON.parse(result.error.message)
            })
        }
    
        const updateMovie = await MovieModel.update({ id, input: result.data })
    
        res.json(updateMovie)
    }
}