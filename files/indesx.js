const fsPromises = require('fs').promises;
const path = require('path');

const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, '', 'promiseFile.txt'), 'utf8');
        console.log(data);
        await fsPromises.unlink(path.join(__dirname, '', 'newReply.txt'));
        await fsPromises.appendFile(path.join(__dirname, "", "promiseFile.txt"), '\n\n hello');
        await fsPromises.rename(path.join(__dirname, '', 'promiseFile.txt'), path.join(__dirname, '', 'promiseFiles.txt'));
       const newData = await fsPromises.readFile(path.join(__dirname, '', 'promiseFiles.txt'), 'utf8');
        console.log(newData);
    }
    catch(err) {
        console.log(err);
    }
}

fileOps();


/*
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
*/


