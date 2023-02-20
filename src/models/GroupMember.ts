import mongoose from 'mongoose';
import GroupChat from './GroupChat.js';
import User from './User.js';

export default mongoose.model(
	'GroupMember',
	new mongoose.Schema({
		userAddress: String,
		IsPrivate: Boolean,
		from_user: String,
		text: String
	})
);
