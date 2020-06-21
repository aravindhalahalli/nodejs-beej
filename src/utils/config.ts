import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import fs from 'fs';
import logger from './logger';

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
} else {
  logger.debug(
    'Using .env.example file to supply config environment variables',
  );
  dotenv.config({ path: '.env.example' });
}

export const ENVIRONMENT = process.env.NODE_ENV;
export const IS_PROD = ENVIRONMENT === 'production'; // Anything else is treated as 'dev'

export const { SESSION_SECRET } = process.env;
export const MONGODB_URI = IS_PROD
  ? process.env.MONGODB_URI
  : process.env.MONGODB_URI_LOCAL;
export const PORT = parseInt(process.env.PORT || '5000', 10);
export const REDIS_PORT = parseInt(process.env.REDIS_PORT || '6379', 10);
export const PLACEHOLDER = 'placeholder';

export const CORS_OPTIONS = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

export const LIMITER = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

if (!SESSION_SECRET) {
  logger.error('No client secret. Set SESSION_SECRET environment variable.');
  process.exit(1);
}

if (!MONGODB_URI) {
  if (IS_PROD) {
    logger.error(
      'No mongo connection string. Set MONGODB_URI environment variable.',
    );
  } else {
    logger.error(
      'No mongo connection string. Set MONGODB_URI_LOCAL environment variable.',
    );
  }

  process.exit(1);
}
