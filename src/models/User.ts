import mongoose from 'mongoose';

export default mongoose.model(
	'User',
	new mongoose.Schema({
		address: {
			required: true,
			type: String,
			unique: true,
			immutable: true,
		},
		nonce: {
			type: String
		},
		refreshToken: {
			type: String,
		},
		refreshTokenVersion: {
			type: Number,
			default: 0,
		},
		latest_nonce_update: {
			type: Date,
			default: Date.now,
		},
		displayName: String,
		profilePicture: String,
		_createdAt: {
			type: Date,
			default: Date.now,
			immutable: true
		},
	})
);