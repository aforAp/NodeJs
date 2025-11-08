const fs = require("fs");

const rs = fs.createReadStream('./promiseFiles.txt', {encoding: 'utf8'});
const ws = fs.createWriteStream('./new-lorem.txt');

//listenignt he data

// rs.on('data', (dataChunk) => {
//     ws.write(dataChunk);
// })

rs.pipe(ws);
