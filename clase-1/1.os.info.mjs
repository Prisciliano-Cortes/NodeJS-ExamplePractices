import { platform, release, arch, cpus, freemem, totalmem, uptime } from 'node:os';


console.log('Information S.O');
console.log('_______________');

console.log('Name S.O: ', platform());
console.log('Version S.O: ', release());
console.log('Architecture: ', arch());
console.log('CPUS: ', cpus());
console.log('Free Memory: ', freemem() / 1024 / 1024);
console.log('Total Memory: ', totalmem() / 1024 / 1024);
console.log('Uptime', uptime() / 60 / 60);