const {format} = require('date-fns');
const {v4: uuid} = require('uuid');

console.log(format(new Date(), 'yyyyMMdd\ttHH:mm:ss'));

console.log("hello");
console.log(uuid());

