// argumentos de entrada - recuperar
// console.log(process.argv)

// controlar el proceso y su salida
// val => 0 - exit 
// val => 1- one error
// process.exit(1)

// podemos controlar eventos del proceso
// process.on('exit', () => {
// limpiar los recursos
// })

// current working directory
console.log(process.cwd())

// platform
console.log(process.env.NODE_ENV)