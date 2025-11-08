const fs = require('fs');

if (!fs.existsSync('./new1')) {
//the above line which helps to check if it was exist no file will be created


fs.mkdir('./new1', (err) => {
    if(err) throw err;
    console.log("driectory created");
})

}

if (fs.existsSync('./new1')) {
//the above line which helps to check if it was exist no file will be created


fs.rmdir('./new1', (err) => {
    if(err) throw err;
    console.log("driectory created");
})

}