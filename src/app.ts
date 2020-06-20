// https://clinicjs.org/documentation/
// Run npx clinic doctor -- node dist/app.bundle.js to diagnose the application
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import hpp from 'hpp';
import morgan from 'morgan';
import compression from 'compression';
import { connectDBAndServer } from './connection';
import v1Router from './routes';
import { corsOptions, limiter, ENV } from './utils/config';

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
    extended: true,
  }),
);
app.use(bodyParser.json());
// middleware to protect against HTTP Parameter Pollution attacks
app.use(hpp());

if (ENV.isDevelopment) {
  app.use(morgan('dev'));
} else {
  // HTTP logger
  app.use(morgan('combined'));
}

app.use('/api/v1', v1Router);

connectDBAndServer(app);
