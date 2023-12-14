import express from 'express'
import { createMovieRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

export const createApp = ({ movieModel }) => {
    const app = express()
    
    app.disable('x-powered-by') //*** Disabled header X-POWERED-BY: Express */
    
    app.use(express.json())
    
    app.use(corsMiddleware())
    
    app.use('/movies', createMovieRouter({ movieModel }))
    
    const PORT = process.env.PORT ?? 1234
    
    app.listen(PORT, () => {
        console.log(`Server listen on port http://localhost:${PORT}`);
    })
}
