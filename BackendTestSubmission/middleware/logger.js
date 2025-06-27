const fs = require('fs');
const path = require('path');

const logStream = fs.createWriteStream(path.join(__dirname, '../log.txt'), { flags: 'a' });

module.exports = (req, res, next) => {
    const logEntry = {
        timestamp: new Date().toISOString(),
        method: req.method,
        path: req.originalUrl,
        headers: req.headers,
        body: req.body
    };

    logStream.write(JSON.stringify(logEntry) + '\n');
    next();
};