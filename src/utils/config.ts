import rateLimit from 'express-rate-limit';

export const ENV = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  isDevelopment: process.env.NODE_ENV === 'development',
  dbname: process.env.DBNAME,
  redisPort: parseInt(process.env.REDIS_PORT || '6379', 10),
};

export const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
