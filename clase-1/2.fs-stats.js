const fs = require('node:fs') //*** As of Node 16, it is recommended to put node: */

//*** Using the synchronous way */
const stats = fs.statSync('./file.txt')

console.log(
    stats.isFile(), //*** If it is a file */
    stats.isDirectory(), //*** If it is a directory */
    stats.isSymbolicLink(), //*** If it is a symbolic link */
    stats.size //*** Byte size */
)