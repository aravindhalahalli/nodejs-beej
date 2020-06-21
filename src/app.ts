// https://clinicjs.org/documentation/
// Run npx clinic doctor -- node dist/app.bundle.js to diagnose the application
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import hpp from 'hpp';
import morgan from 'morgan';
import compression from 'compression';
import mongoose from 'mongoose';
import mongo from 'connect-mongo';
import session from 'express-session';
import lusca from 'lusca';
import errorHandler from 'errorhandler';
import v1Router from '@routes/index';
import {
  CORS_OPTIONS,
  LIMITER,
  IS_PROD,
  MONGODB_URI,
  SESSION_SECRET,
  PLACEHOLDER,
} from '@utils/config';
import { logStream } from '@utils/logger';

const app = express();
const MongoStore = mongo(session);

mongoose
  .connect(MONGODB_URI || PLACEHOLDER, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    console.info('🚀 The server is connected to MongoDB');
  })
  .catch((err) => {
    console.info(
      `MongoDB connection error. Please make sure MongoDB is running. ${err}`,
    );
    // process.exit();
  });

// ====================== Express Configuration ===========================
app.enable('trust proxy');

// Compress the incoming request and outgoing response
app.use(compression());

// Integrates necessary security related middlewares
app.use(helmet());

// Enable cors for particular routes
app.use(cors(CORS_OPTIONS));

// Limit the rate of requests if someone is trying to spam
app.use(LIMITER);

// Parse the form/json response
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());
// middleware to protect against HTTP Parameter Pollution attacks
app.use(hpp());

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET || PLACEHOLDER,
    cookie: { secure: true },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      autoReconnect: true,
    }),
  }),
);

app.use(
  lusca({
    xframe: 'SAMEORIGIN',
    xssProtection: true,
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    nosniff: true,
    referrerPolicy: 'same-origin',
  }),
);

if (IS_PROD) {
  // HTTP logger
  app.use(morgan('combined', { stream: logStream }));
} else {
  app.use(morgan('dev', { stream: logStream }));
  app.use(errorHandler());
}

app.use('/api/v1', v1Router);

export { app as default };
