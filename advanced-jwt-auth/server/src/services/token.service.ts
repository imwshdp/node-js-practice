import jwt from 'jsonwebtoken';
import { IToken, Token } from '../models/token.model';

class TokenService {
	private _accessSecret: string;
	private _refreshSecret: string;

	constructor() {
		if (!process.env.JWT_ACCESS_SECRET_KEY || !process.env.JWT_REFRESH_SECRET_KEY) {
			throw new Error('JWT secret environment variables is missing');
		}
		this._accessSecret = process.env.JWT_ACCESS_SECRET_KEY;
		this._refreshSecret = process.env.JWT_REFRESH_SECRET_KEY;
	}

	generateTokens<T extends object>({
		payload
	}: {
		payload: T;
	}): {
		accessToken: string;
		refreshToken: string;
	} {
		const accessToken = jwt.sign(payload, this._accessSecret, { expiresIn: '1h' });
		const refreshToken = jwt.sign(payload, this._refreshSecret, { expiresIn: '7d' });

		return { accessToken, refreshToken };
	}

	async saveToken({ refreshToken, userId }: { userId: string; refreshToken: string }): Promise<IToken> {
		const tokenData = await Token.findOne({ user: userId });
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}
		return Token.create({ user: userId, refreshToken });
	}
}

export default new TokenService();
