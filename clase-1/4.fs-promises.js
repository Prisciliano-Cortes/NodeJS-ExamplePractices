//*** This only in native modules */
//*** That don't have native promises */
// const { promisify } = require('node:util')
// const readFilePromise = promisify(fs.readFile)



const fs = require('node:fs/promises')

console.log('Reading the first file...')
fs.readFile('./file.txt', 'utf-8')
.then(text => {
    console.log('First text:', text)
})

console.log('--> Do things while reading the file...')

console.log('Reading the second file...')
fs.readFile('./file2.txt', 'utf-8')
.then(text => {
    console.log('Second text:', text)
})