const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const logDir = 'logs';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(timestamp(), logFormat),
    transports: [
      new transports.Console(),
      new transports.File({ filename: path.join(logDir, 'combined.log') }),
    ],
});

logger.stream = {
    write: (message) => logger.info(message.trim()),
};

module.exports = logger;