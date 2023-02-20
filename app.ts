import express from 'express';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

// ROUTERS
import authRouter from './src/routes/auth.js';
import messagesRouter from './src/routes/messages.js';
// ------------------------------

const app = express();

// const allowedOrigins = [];
// const corsOptions: CorsOptions = {
// 	origin: function (origin, callback) {
// 		if (process.env.ENVIRONMENT === 'dev') return callback(null, true);
// 		if (!origin) return callback(null, true); // callback(new Error('Not allowed by CORS'));
// 		if (allowedOrigins.indexOf(origin) !== -1) {
// 			callback(null, true);
// 		} else {
// 			callback(new Error('Not allowed by CORS'));
// 		}
// 	},
// 	credentials: true,
// 	optionsSuccessStatus: 200,
// };

app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use('/auth', authRouter);
app.use('/messages', messagesRouter);


export default app;
