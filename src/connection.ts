import fs from 'fs';
import https from 'https';
import http from 'http';
import { Express } from 'express';
import mongoose from 'mongoose';
import redis from 'redis';
import { isDevelopment } from './utils/config';

type Server = https.Server | http.Server;
type Port = number;

// On successful connection, log the message
const onConnect = (server: Server) => {
  const addr = server.address();
  const bind =
    typeof addr === 'string' ? `pipe ${addr}` : `port ${addr ? addr.port : 0}`;

  console.info(`🚀 REST APIs are running on ${bind}`);
};

const onError = (err: any) =>
  console.error('OOPS! There seems to be problem: =====>', err);

const connectServer = (serverInstance: Server, port: Port) => {
  serverInstance.listen(port, onConnect.bind(null, serverInstance));
  serverInstance.on('error', onError);
  serverInstance.on('listening', onConnect.bind(null, serverInstance));
};

// Create a redis client via the provided config
const client = redis.createClient({
  // Docker finds and handles the host for us
  host: 'redis-server',
  port: 6379,
});

client.on('error', onError);

// A utility function to start the app only if we can connect to mongodb
export const connectDBAndServer = async (nodeapp: Express, nodePort: Port) => {
  try {
    await mongoose.connect('mongodb://mongodb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    });

    if (isDevelopment) {
      /**
       * Get cert from environment and store in Express.
       */
      const privateKey = fs.readFileSync('sslcert/key.pem', 'utf8');
      const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

      /**
       * Prepare the credentials
       */
      const credentials = {
        key: privateKey,
        cert: certificate,
      };

      const serverSecured = https.createServer(credentials, nodeapp);

      connectServer(serverSecured, nodePort);
    } else {
      // http server
      // @TODO: This needs to replaced for prod
      const server = http.createServer(nodeapp);

      connectServer(server, nodePort);
    }
  } catch (error) {
    // If we cannot connect to the database, show the error
    onError(error);
  }
};
