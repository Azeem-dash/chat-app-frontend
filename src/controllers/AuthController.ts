import { isValidAddress } from '@ethereumjs/util';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import {
	generateAccessToken,
	generateNonce,
	generateRefreshToken,
	removeIatandExp,
	verifySignature,
} from '../utils/auth.js';

// -----------------------------------

export const getNonce = async (req, res) => {
	const address = req.params?.address?.toLowerCase();
	if (!isValidAddress(address)) return res.status(400).send({ error: 'Invalid address' });

	// generate nonce
	const nonce = generateNonce();

	try {
		// check if user exists
		const user = await User.findOne({ address });
		if (!user?.nonce) {
			await User.create({ address, nonce });
		} else {
			user.nonce = nonce;
			user.latest_nonce_update = new Date();
			await user.save();
		}

		res.status(200).send({ nonce });
	} catch (error) {
		console.log(error);
		res.status(500).send({ error: 'Internal Server Error' });
	}
};

export const login = async (
	req,
	res
) => {
	const { signature } = req?.body;
	const address = req.body?.address?.toLowerCase();
	if (!address || !signature) {
		return res.status(400).send({ error: 'Invalid Credentials' });
	}

	try {
		const user = await User.findOne({ address });
		if (!user || !user.nonce) return res.sendStatus(401);

		const isValidSignature = verifySignature(address, signature, user.nonce);
		if (!isValidSignature) {
			user.nonce = generateNonce();
			await user.save();
			return res.sendStatus(401);
		}


		const userJWT = {
			address,
			signature,
			nonce: user.nonce,
		};
		const AccessToken = generateAccessToken(userJWT);
		const RefreshToken = generateRefreshToken(userJWT);

		// encrypt refresh token ?
		user.refreshToken = String(RefreshToken);
		user.nonce = generateNonce();
		user.latest_nonce_update = new Date();
		await user.save();

		res.cookie('refreshToken', RefreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'Strict',
			maxAge: 1000 * 60 * 60 * 24 * 30,
		});
		res.status(200).send({
			AccessToken,
			...userJWT,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ error: 'Internal Server Error' });
	}
};

export const refreshToken = async (req, res) => {
	// activate cookie

	const { refreshToken } = req.cookies;
	console.log(refreshToken);
	if (!refreshToken) {
		return res.sendStatus(401);
	}

	// check if refreshToken is in DB
	const user = await User.findOne({ refreshToken });
	if (!user) return res.sendStatus(401);

	jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, jwt_payload) => {
		if (err) return res.sendStatus(403);
		if (user.address != jwt_payload.address)
			return res.status(401).send({ message: 'Invalid refreshToken' });
		const AccessToken = generateAccessToken(removeIatandExp(jwt_payload));

		// update refresh token
		const newRefreshToken = generateRefreshToken(removeIatandExp(jwt_payload));
		user.refreshToken = String(newRefreshToken);
		user.refreshTokenVersion++;
		user.save();

		res.cookie('refreshToken', newRefreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'Strict',
			maxAge: 1000 * 60 * 60 * 24 * 30,
		});
		res.status(200).send({ AccessToken, ...removeIatandExp(jwt_payload) });
	});
};

export const logout = async (req, res) => {
	res.clearCookie('refreshToken');
	res.sendStatus(200);
};

// ----------------------------------- Type Definitions -----------------------------------

type LoginBody = {
	address: string;
	signature: string;
};