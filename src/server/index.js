'use strict';

import path from 'path';
import express from 'express';
import https from 'https';
import fs from 'fs';
import ws from 'ws';
import { roomOptions, peerCapabilities } from './options';
import { port, auth } from '../config';


const app = express();


//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(`src/client`)));


//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('/', (req, res, next) => {
  try {
  	res.sendFile(path.resolve(`src/client/index.html`));
  } catch (err) {
    next(err);
  }
});


//
// Launch the server
// -----------------------------------------------------------------------------
const server = https.createServer({
	key: fs.readFileSync(__dirname + '/key.pem'),
	cert: fs.readFileSync(__dirname + '/cert.pem')
}, app).listen(port, () => {
	console.log(`The server is running at https://localhost:${port}/`);
});

const wss = new ws.Server({ server: server });

wss.on('connection', (connection) => {
	connection.on('message', (message) => {
		for(let i = 0; wss.clients.length > i; i++) {
			if (connection !== wss.clients[i]) wss.clients[i].send(message);
		}
	});
});
