const express = require('express')
const ditto = require('./pomekon/ditto.json')

const app = express()

app.disable('x-powered-by')

app.use(express.json())

const PORT = process.env.PORT ?? 3000

app.use( (req, res, next) => {
    console.log('My middleware');

    next()
})

app.get('/pokemon/ditto', (req, res) => {
    //res.status(200).send('<h1>My page</h1>')
    res.json(ditto)
})

app.post('/pokemon', (req, res) => {
    // req.body deberíamos guardar en bbdd
    res.status(201).json(req.body)
})

app.use((req, res) => {
    res.status(404).send('<h1>404</h1>')
})

app.listen( PORT, () => {
    console.log(`Server listening on port http://localhost:${ PORT }`);
})