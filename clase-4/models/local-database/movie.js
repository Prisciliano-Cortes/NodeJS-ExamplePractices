import { createRequire } from 'node:module'
import { randomUUID } from 'node:crypto'

//*** Read JSON in ESModules */
//const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

//*** Read JSON in ESModules now */
const require = createRequire(import.meta.url)
const movies = require('../../movies.json')

export class MovieModel {
    static async getAll({ genre }) {
        if ( genre ) {
            return movies.filter( 
                movie => movie.genre.some(
                    g => g.toLowerCase() === genre.toLocaleLowerCase()
                )
            )
        }

        return movies
    }

    static async getById({ id }){
        const movie = movies.find(movie => movie.id === id)

        return movie
    }

    static async create({ input }) {
        //*** In DB */
        const newMovie = {
            id: randomUUID(), //*** UID native */
            ...input
        }

        movies.push(newMovie)

        return newMovie
    }

    static async delete({ id }) {
        const movieIndex = movies.findIndex( movie => movie.id === id)

        if ( movieIndex === -1) {
            return false
        }

        movies.splice(movieIndex, 1)

        return true
    }

    static async update({ id, input }) {
        const movieIndex = movies.findIndex( movie => movie.id === id)

        if (movieIndex === -1) {
            return false
        }

        movies[movieIndex] = {
            ...movies[movieIndex],
            ...input
        }

        return movies[movieIndex]
    }
}