import fs from 'fs';
import https from 'https';
import http from 'http';
import { Express } from 'express';
import redis from 'redis';
import { IS_PROD, PORT, REDIS_PORT } from '@utils/config';
import app from './app';

type Server = https.Server | http.Server;
type Port = number;

// On successful connection, log the message
const onConnect = (server: Server) => {
  const addr = server.address();
  const bind =
    typeof addr === 'string' ? `pipe ${addr}` : `port ${addr ? addr.port : 0}`;

  console.info(`🚀 REST APIs are running on ${bind}`);
};

// On any connection error
const onError = (err: any) =>
  console.error('<========= OOPS! There seems to be problem: =========>', err);

const connectServer = (serverInstance: Server, port: Port) => {
  serverInstance.listen(port, onConnect.bind(null, serverInstance));
  serverInstance.on('error', onError);
  serverInstance.on('listening', onConnect.bind(null, serverInstance));

  return serverInstance;
};

// Create a redis client via the provided config
const client = redis.createClient({
  // Docker finds and handles the host for us
  host: 'redis-server',
  port: REDIS_PORT,
});

client.on('error', onError);

// A utility function to start the app only if we can connect to mongodb
const connectDBAndServer = (nodeapp: Express): Server => {
  if (IS_PROD) {
    // http server
    // @TODO: This needs to replaced for prod
    const server = http.createServer(nodeapp);

    return connectServer(server, PORT);
  }
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

  return connectServer(serverSecured, PORT);
};

connectDBAndServer(app);
