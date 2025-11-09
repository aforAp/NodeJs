const {format} = require('date-fns');
const {v4: uuid} = require('uuid');
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logTime = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logTime);
    try {
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }
        //testing
      await fsPromises.appendFile(path.join(__dirname, "logs", "new-lorem.txt"), logTime);
    } catch(err){
        console.log(err);
    }
}

module.exports = logEvents;

