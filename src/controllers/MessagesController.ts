import { isValidAddress } from '@ethereumjs/util';
import Message from '../models/Message.js';
import GroupMember from '../models/GroupMember.js';

import GroupChatInfo from '../models/GroupChat.js'
import User from '../models/User.js';

import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

let onlineUsers = {};

export const getConversations = async (req, res) => {
	const { user } = req;
	try {
		const result = await Message.aggregate([
			{
				$match: {
					$or: [{ from_user: user.address }, { to_user: user.address }],
				},
			},
			{
				$group: {
					_id: {
						$cond: [
							{
								$eq: ['$from_user', user.address],
							},
							'$to_user',
							'$from_user',
						],
					},

					messages: {
						$push: {
							from_user: '$from_user',
							to_user: '$to_user',
							message_text: '$message_text',
							_createdAt: '$_createdAt',
						},
					},
				},
			},
			// add recipient to the result as an object from User collection (using the address field in the User collection)
			{
				$lookup: {
					from: 'users',
					localField: '_id',
					foreignField: 'address',
					as: 'recipient',
				},
			},
			// remove the recipient array from the result

			{
				$unwind: {
					path: '$recipient',
					preserveNullAndEmptyArrays: true,
				},
			},

			{
				$sort: {
					'messages._createdAt': -1,
				},
			},
		]);

		const response = result.map((conversation) => {
			const { _id, messages, recipient } = conversation;
			delete recipient._id;
			delete recipient.refreshTokenVersion;
			delete recipient.nonce;
			delete recipient.latest_nonce_update;
			delete recipient.__v;
			delete recipient._createdAt;
			delete recipient.refreshToken;

			return {
				recipient,
				messages,
			};
		});

		res.json(response);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};

export const getMessages = (req, res) => {
	res.sendStatus(501);
};

export const sendMessage = async (req, res) => {
	const { user } = req;
	const { text } = req.body;
	const to = req.body?.to?.toLowerCase();

	if (!to || !text || !isValidAddress(to)) return res.sendStatus(400);

	if (onlineUsers[to]) {
		const socketId = onlineUsers[to].socketId;
		global.io.to(socketId).emit('message', {
			from_user: user.address,
			to_user: to.toLowerCase(),
			message_text: text,
		});
	}

	try {
		await Message.create({
			from_user: user.address,
			to_user: to.toLowerCase(),
			message_text: text,
		});

		res.sendStatus(200);

		// check if to user already exists in the database, if not, create a new user
		const userExists = await User.exists({ address: to.toLowerCase() });
		if (!userExists) {
			await User.create({
				address: to.toLowerCase(),
			});
		}
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};

export const SaveGroupMessage = async (req, res) => {
	console.log("------------------------------here---------------------")
	// console.log(req.body.text);
	const { user } = req.body.from_user;
	const { text } = req.body.text;
	const to = req.body?.to

	// if (to.length === 0 || !text) {
	// 	to.forEach(element => {
	// 		!isValidAddress(element)return res.sendStatus(400);
	// 	});
	// }

	// if (onlineUsers[to]) {
	// 	const socketId = onlineUsers[to].socketId;
	// 	global.io.to(socketId).emit('message', {
	// 		from_user: user.address,
	// 		to_user: to.toLowerCase(),
	// 		message_text: text,
	// 	});
	// }

	try {
		await GroupMember.create({
			to: to,
			IsPrivate: req.body.IsPrivate,
			from_user: req.body.from_user,
			text: req.body.text,
		}).then(res => {
			console.log("Saved ", res);

		}).catch((err) => {
			console.log("Err");

		});

		res.sendStatus(200);

		// // check if to user already exists in the database, if not, create a new user
		// const userExists = await User.exists({ address: to.toLowerCase() });
		// if (!userExists) {
		// 	await User.create({
		// 		address: to.toLowerCase(),
		// 	});
		// }
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};


// ----------------- Websocket Server -----------------

export const initWebsocketServer = (server) => {
	// init websocket server
	const io = new Server();

	console.log('ws server running');

	io.on('connection', function (socket) {
		let address;
		socket.on('message', function (msg) {
			console.log('--->  message:' + msg);
			jwt.verify(String(msg), process.env.JWT_ACCESS_SECRET, (err, decoded) => {
				if (err) {
					console.log(err);
					return socket.disconnect();
				}
				address = decoded.address;
				console.log('--->  address:' + address, ' | decoded.Address: ', decoded.address);
				if (!address) return;
				console.log('---> ' + address + ' joined');
				onlineUsers[address] = {
					address,
					socketId: socket.id,
				};
			});
		});

		socket.on('disconnect', function () {
			delete onlineUsers[address];
			console.log('---> ' + address + ' left');
		});
	});

	io.listen(server);

	global.io = io;
};
