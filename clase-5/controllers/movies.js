import { validateMovie, validatePartialMovie } from "../schema/movies.js"

export class MovieController {
    constructor({movieModel}) {
        this.movieModel = movieModel
    }

    getAll = async(req, res) => {
        const { genre } = req.query

        try {
            const movies = await this.movieModel.getAll({ genre })
            
            res.json(movies)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    getById = async(req, res) => { //*** id: Path-to-regexp  */
        const { id } = req.params
    
        const movie = await this.movieModel.getById({ id })
    
        if ( !movie ) {
            return res.status(404).json({
                message: 'Movie not found'
            })
        }
    
        res.json(movie)
    }

    create = async(req, res) => {
        const result = validateMovie(req.body)
     
        if (result.error) {
            return res.status(400).json({
                error: JSON.parse(result.error.message)
            })
        }
     
        const newMovie = await this.movieModel.create({input: result.data})
     
        res.status(201).json(newMovie)
    }

    delete = async(req, res) => {
        const { id } = req.params
    
        const result = await this.movieModel.delete({ id })
    
        if ( result === false ) {
            return res.status(404).json({
                message: 'Movie not found'
            })
        }
    
        return res.json({
            message: 'Movie deleted'
        })
    }

    update = async(req, res) => {
        const { id } = req.params
    
        const result = validatePartialMovie(req.body)
    
        if ( !result.success ) {
            return res.status(400).json({
                error: JSON.parse(result.error.message)
            })
        }
    
        const updateMovie = await this.movieModel.update({ id, input: result.data })
    
        res.json(updateMovie)
    }
}