const { readFile } = require('node:fs/promises')

async function init () {
    console.log('Leyendo el primer archivo...')
    const text = await readFile('./file.txt', 'utf-8')
    console.log('primer texto:', text)
    console.log('--> Hacer cosas mientras lee el archivo...')
    
    console.log('Leyendo el segundo archivo...')
    const secondText = await readFile('./file2.txt', 'utf-8')
    console.log('segundo texto:', secondText)    
}
  
init()

// IIFE - Immediately Invoked Function Expression
;( async () => {
        console.log('Leyendo el primer archivo...')
        const text = await readFile('./file.txt', 'utf-8')
        console.log('primer texto:', text)
        console.log('--> Hacer cosas mientras lee el archivo...')
        
        console.log('Leyendo el segundo archivo...')
        const secondText = await readFile('./file2.txt', 'utf-8')
        console.log('segundo texto:', secondText)    
    }
)()