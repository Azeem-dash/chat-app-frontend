import app from './app.js';
import { createServer } from 'http';
import 'dotenv/config';
import mongoose from 'mongoose';
import User from './src/models/User.js';
import { initWebsocketServer } from './src/controllers/MessagesController.js';
// init server
const PORT = process.env.PORT || 8080;
const server = createServer(app);

server.listen(PORT, async () => {
	console.log('App running on port', Number(PORT));
	// init mongooose
	mongoose.connect(process.env.MONGO_DB_URI!, async () => {
		console.log('Connected to MongoDB');
		initWebsocketServer(server);
	});
});
