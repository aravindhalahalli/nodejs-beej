import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';
import hpp from 'hpp';
import morgan from 'morgan';
import compression from 'compression';

enum ENV {
  DEVELOPMENT = 'development',
}

const PORT = 5000;

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const app = express();

app.enable('trust proxy');

// Compress the incoming request and outgoing response
app.use(compression());

// Integrates necessary security related middlewares
app.use(helmet());

// Enable cors for particular routes
app.use(cors(corsOptions));

// Limit the rate of requests if someone is trying to spam
app.use(limiter);

// Parse the form/json response
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
// middleware to protect against HTTP Parameter Pollution attacks
app.use(hpp());

// HTTP logger
if (ENV.DEVELOPMENT === process.env.NODE_ENV) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(PORT, () =>
  console.info(
    `
      🚀 REST APIs are running on port http://localhost:${PORT}/
    `,
  ),
);
