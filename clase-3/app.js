const crypto = require('node:crypto')
const express = require('express')
const cors = require('cors')
const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./schema/movies')

const app = express()

app.disable('x-powered-by') //*** Disabled header X-POWERED-BY: Express */

app.use(express.json())

app.use(cors({
    origin: (origin, callback) => {
        const ACCEPTED_ORIGINS = [
            "http://localhost:8080",
            "https://movies.com"
        ]

        if (ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true)
        }

        if (!origin) {
            return callback(null, true)
        }

        return callback(new Error('Not allowed by CORS'))
    }
}))

//*** Normal method: GET/HEAD/POST */
//*** Complex method: PUT/PATCH/DELETE */

//*** CORS PRE-Flight */
//*** OPTIONS */
const ACCEPTED_ORIGINS = [
    "http://localhost:8080",
    "https://movies.com"
]

// app.get('/movies', (req, res) => {
//     res.json(movies)
// })

app.get('/movies/:id', (req, res) => { //*** id: Path-to-regexp  */
    const { id } = req.params

    const movie = movies.find(movie => movie.id === id)

    if ( movie ) {
        return res.json(movie)
    }

    res.status(404).json({
        message: 'Movie not found'
    })
})

app.get('/movies', (req, res) => {
    
    // const origin = req.header('origin')
    // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    //     res.header('Access-Control-Allow-Origin', origin)
    // }

    // res.header('Access-Control-Allow-Origin', '*')
    // res.header('Access-Control-Allow-Origin', 'http://localhost:8080')

    const { genre } = req.query

    if ( genre ) {
        const filterMovie = movies.filter( 
            movie => movie.genre.some(
                g => g.toLowerCase() === genre.toLocaleLowerCase()
            )
        )

        return res.json(filterMovie)
    }
    res.json(movies)
})

app.post('/movies', (req, res) => {
   const result = validateMovie(req.body)

    if (result.error) {
        return res.status(400).json({
            error: JSON.parse(result.error.message)
        })
    }

    // const {
    //     title,
    //     genre,
    //     year,
    //     director,
    //     duration,
    //     rate, 
    //     poster
    // } = req.body


    //*** Use when not exist validations */
    // const newMovie = {
    //     id: crypto.randomUUID(), //*** UID native */
    //     title,
    //     genre,
    //     director,
    //     year,
    //     duration,
    //     rate: rate ?? 0,
    //     poster
    // }

    //*** In DB */
    const newMovie = {
        id: crypto.randomUUID(), //*** UID native */
        ...result.data
    }

    movies.push(newMovie)

    res.status(201).json(newMovie)
})

app.delete('/movies/:id', (req, res) => {
    // const origin = req.header('origin')
    // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    //     res.header('Access-Control-Allow-Origin', origin)
    // }

    const { id } = req.params

    const movieIndex = movies.findIndex( movie => movie.id === id)

    if ( movieIndex === -1 ) {
        return res.status(404).json({
            message: 'Movie not found'
        })
    }

    movies.splice(movieIndex, 1)

    return res.json({
        message: 'Movie deleted'
    })
})

app.patch('/movies/:id', (req, res) => {
    const { id } = req.params

    const result = validatePartialMovie(req.body)

    if ( !result.success ) {
        return res.status(400).json({
            error: JSON.parse(result.error.message)
        })
    }

    const movieIndex = movies.findIndex( movie => movie.id === id)

    if ( movieIndex === -1 ) {
        return res.status(404).json({
            message: 'Movie not found'
        })
    }

    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }

    movies[movieIndex] = updateMovie

    return res.status(200).json(updateMovie)
})

app.options('/movies/:id', (req, res) => {
    // const origin = req.header('origin')
    // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    //     res.header('Access-Control-Allow-Origin', origin)
    //     res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    // }

    res.send(200)
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Server listen on port http://localhost:${PORT}`);
})