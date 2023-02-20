import { Address } from '@ethereumjs/util';
import mongoose from 'mongoose';
import GroupChat from './GroupChat.js';
import User from './User.js';

export default mongoose.model(
	'Message',
	new mongoose.Schema({
		from_user: String,
		to_user: String,
		message_text: String,
		_createdAt: {
			type: Date,
			default: Date.now,
			immutable: true,
		},
	})
);
