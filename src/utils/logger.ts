import winston, { format } from 'winston';
import { PROD } from './constants';

const fileConfig = {
  filename: 'logs/combined.log',
  handleExceptions: true,
  json: true,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  colorize: false,
};

// define the custom settings for each transport (file, console)
const options = {
  fileCombined: {
    ...fileConfig,
  },
  fileError: {
    ...fileConfig,
    level: 'error',
    filename: 'logs/error.log',
  },
  console: {
    level: process.env.NODE_ENV === PROD ? 'error' : 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = winston.createLogger({
  format: format.combine(format.timestamp(), format.simple()),
  transports: [
    new winston.transports.File(options.fileCombined),
    new winston.transports.File(options.fileError),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

export const logStream = {
  write: (message: string) => {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

if (process.env.NODE_ENV !== PROD) {
  logger.debug('Logging initialized at debug level');
}

export { logger as default };
