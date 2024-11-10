import jwt from 'jsonwebtoken';
import { IToken, Token } from '../models/token.model';
import ApiError from '../exceptions/api.error';
import { IUser } from '../types/user.types';

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
		const accessToken = jwt.sign(payload, this._accessSecret, { expiresIn: '30m' });
		const refreshToken = jwt.sign(payload, this._refreshSecret, { expiresIn: '14d' });

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

	async removeToken({ refreshToken }: { refreshToken: string }) {
		const token = await Token.deleteOne({ refreshToken });
		return token;
	}

	validateAccessToken({ accessToken }: { accessToken: string }): IUser | null {
		try {
			const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET_KEY;
			if (!JWT_ACCESS_SECRET) {
				throw new Error('JWT access secret environment variable is not defined');
			}

			const user = jwt.verify(accessToken, JWT_ACCESS_SECRET);
			return user as IUser;
		} catch (error) {
			return null;
		}
	}

	validateRefreshToken({ refreshToken }: { refreshToken: string }): IUser | null {
		try {
			const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET_KEY;
			if (!JWT_REFRESH_SECRET) {
				throw new Error('JWT refresh secret environment variable is not defined');
			}

			const user = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
			return user as IUser;
		} catch (error) {
			return null;
		}
	}

	async findToken({ refreshToken }: { refreshToken: string }): Promise<IToken | null> {
		const token = await Token.findOne({ refreshToken });
		return token;
	}
}

export default new TokenService();
