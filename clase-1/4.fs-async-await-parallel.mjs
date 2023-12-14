//*** This only in native modules */
//*** That don't have native promises */
// const { promisify } = require('node:util')
// const readFilePromise = promisify(fs.readFile)



import { readFile } from 'node:fs/promises'

Promise.all([
    readFile('./file.txt', 'utf-8'),
    readFile('./file2.txt', 'utf-8')
]).then(([text, secondText]) => {
    console.log('primer texto:', text)
    console.log('segundo texto:', secondText)
})