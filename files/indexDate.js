const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, '', 'name.txt'),'utf8', (err, data) => {
    if(err) throw err;
    console.log(data.toString());
})

console.log("hello.....");
process.on('uncaughtException', err => {
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1);

})

fs.writeFile(path.join(__dirname, '', 'reply.txt'),'Nice to meet you', (err, data) => {
    if(err) throw err;
    console.log("operation complete");
    fs.appendFile(path.join(__dirname, '', 'reply.txt'),'\nNice to meet you', (err) => {
    if(err) throw err;
    console.log("operation complete");
   
    
})
    fs.rename(path.join(__dirname, '', 'reply.txt'), path.join(__dirname, "", "newReply.txt"), (err) => {
    if(err) throw err;
    console.log("rename complete");
   
    
})
})


