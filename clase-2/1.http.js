const http = require('node:http') // HTTP Protocol
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
    console.log("Request received", req.url);
    // res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.setHeader('Content-Type', 'text/html; charset=utf-8')

    if ( req.url === '/' ) {
        res.statusCode = 200
        res.end('<h1>Welcome my website main</h1>')
    } else if( req.url === '/image') {
        fs.readFile('./img.jpg', (err, data) => {
            if (err) {
                res.statusCode = 500
                res.end('<h1>500 Internal Server Error</h1>')
            } else {
                res.setHeader('Content-Type', 'image/png')
                res.end(data)
            }
        })
    } else if ( req.url === '/contact') {
        res.statusCode = 200
        res.end('<h1>Welcome my website contact</h1>')
    } else {
        res.statusCode = 404
        res.end('<h1>404</h1>')
    }
}

const server = http.createServer( processRequest )

server.listen(desiredPort, () => {
    console.log(`Server listening on port http://localhost:${ desiredPort }`);
})