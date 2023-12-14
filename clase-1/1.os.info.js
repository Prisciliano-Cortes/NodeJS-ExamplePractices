const os = require('node:os')


console.log('Information S.O');
console.log('_______________');

console.log('Name S.O: ', os.platform());
console.log('Version S.O: ', os.release());
console.log('Architecture: ', os.arch());
console.log('CPUS: ', os.cpus());
console.log('Free Memory: ', os.freemem() / 1024 / 1024);
console.log('Total Memory: ', os.totalmem() / 1024 / 1024);
console.log('Uptime', os.uptime() / 60 / 60);