import winston from 'winston';

const options: winston.LoggerOptions = {
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
      handleExceptions: true,
    }),
    new winston.transports.File({
      filename: 'log/server.log',
      level: 'debug',
      handleExceptions: true,
      maxsize: 5242880,
      maxFiles: 5,
    }),
  ],
  exitOnError: false,
};

const logger = winston.createLogger(options);

export const logStream = {
  write: (message: string) => {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

if (process.env.NODE_ENV !== 'production') {
  logger.debug('Logging initialized at debug level');
}

export { logger as default };
