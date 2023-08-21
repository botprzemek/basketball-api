import express from 'express';
import * as dotenv from 'dotenv';
import router from './routes/Router.js';
import cors from 'cors';

dotenv.config();

const server = express(), serverPort = process.env.SERVER_PORT, websiteAddresses = JSON.parse(process.env.WEBSITE_ADDRESSES);
const options = {origin:websiteAddresses};

server.use(cors(options));
server.options('*', cors(options));

server.disable('x-powered-by');

server.use(express.json({ limit: '1mb' }));
server.use(express.urlencoded({ extended: false }));

server.get('/', (req, res) => {
  res.send(JSON.stringify({
      brah:{
          brah
      }
  }));
});

server.listen(serverPort, () => console.log(`[server] Listening on http://localhost:${serverPort}`));