const fs = require('node:fs/promises')
//const fs = require('node:fs/')


fs.readdir('.')
    .then(files => {
        files.forEach(file => {
            console.log(file)
        })
    })
    .catch(err => {
        if (err) {
            console.error('Error al leer el directory: ', err)
            return;
        }
    })

// fs.readdir('.', (err, files) => {
//     if (err) {
//         console.log("Error in read dir", err);
//         return
//     }

//     files.forEach( file => {
//         console.log(file)
//     })
// })