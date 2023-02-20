import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import ethUtil from '@ethereumjs/util';
import { recoverPersonalSignature } from 'eth-sig-util';

import 'dotenv/config';
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

export const generateNonce = (): string => {
	const nonce = crypto.randomBytes(16).toString('hex');
	return nonce;
};

export const generateAccessToken = (payload: Object): String => {
	return jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '25m' });
};

export const generateRefreshToken = (payload: Object): String => {
	return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '30d' });
};

export const verifySignature = (address: string, signature: string, nonce: string): boolean => {
	try {
		const msg = `Welcome to Wallet Messenger!\n\nPlease sign this message to verify ownership of the wallet.\n\nUnique Access Token: ${nonce}`;

		const msgBufferHex = ethUtil.bufferToHex(Buffer.from(msg, 'utf8'));
		const extracted_address = recoverPersonalSignature({
			data: msgBufferHex,
			sig: signature,
		});

		return extracted_address.toLowerCase() == address.toLowerCase();
	} catch (error) {
		console.log(JSON.stringify(error));
	}
};

export const removeIatandExp = (payload: {
	iat: number;
	exp: number;
	[key: string]: any;
}): Object => {
	const { iat, exp, ...rest } = payload;
	return rest;
};

// export const getUserType = async (address: string): Promise<UserType> => {
// 	if (await checkIfHolder(address)) return UserType.HOLDER;
// 	if (await checkIfSubscriber(address)) return UserType.SUBSCRIBER;

// 	if (allowlist.includes(address.toLowerCase())) {
// 		return UserType.HOLDER;
// 	} else {
// 		return UserType.FREE;
// 	}
// };