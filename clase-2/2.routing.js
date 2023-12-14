const http = require('node:http')
const dittoJson = require('./pomekon/ditto.json')

const desiredPort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
    const { method, url } = req

    switch (method) {
        case 'GET': {
            switch (url) {
                case '/pokemon/ditto': {
                    res.setHeader('Content-Type', 'application/json; charset=utf-8')
                    return res.end( JSON.stringify(dittoJson))
                }
                default: {
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/html; charset=utf-8')
                    return res.end('<h1>404</h1>')
                }
            }
        }

        case 'POST': {
            switch (url) {
                case '/pokemon': {
                    let body = ''
                    req.on('data', chunk => {
                        body += chunk.toString()
                    })

                    req.on('end', () => {
                        const data = JSON.parse(body)

                        res.writeHead(201, 'Content-Type', 'application/json; charset=utf-8')
                        res.end(JSON.stringify(data))
                    })

                    data.timestamp = Date.now()
                    break
                }
                default: {
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/html; charset=utf-8')
                    return res.end('<h1>404</h1>')
                }
            }
        }
    }
}

const server = http.createServer( processRequest )

server.listen(desiredPort, () => {
    console.log(`Server listening on port http://localhost:${ desiredPort }`);
})