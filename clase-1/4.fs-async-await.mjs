//*** This only in native modules */
//*** That don't have native promises */
// const { promisify } = require('node:util')
// const readFilePromise = promisify(fs.readFile)



import { readFile } from 'node:fs/promises'

console.log('Reading the first file...')
const text = await readFile('./file.txt', 'utf-8')
console.log('First text:', text)

console.log('--> Do things while reading the file...')

console.log('Reading the second file...')
const secondText = await readFile('./file2.txt', 'utf-8')
console.log('Second text:', secondText)