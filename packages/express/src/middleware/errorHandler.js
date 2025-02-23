const logger = require('./logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
};

module.exports = errorHandler;