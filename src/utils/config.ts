import rateLimit from 'express-rate-limit';

export enum ENV {
  DEVELOPMENT = 'development',
  PORT = 5000,
}

export const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

export const isDevelopment = ENV.DEVELOPMENT === process.env.NODE_ENV;
