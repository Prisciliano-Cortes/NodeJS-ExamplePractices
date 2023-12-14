const fs = require('node:fs')

//*** Work asynchronously */
console.log('Read first file...')

fs.readFile('./file.txt', 'utf-8', (err, text) => { // <---- run this callback
    console.log('First text:', text)
})

console.log('--> Do things while reading the file...')

console.log('Reading the second file...')

fs.readFile('./file2.txt', 'utf-8', (err, text) => {
    console.log('Second text:', text)
})