import type { Request, Response, NextFunction } from 'express';
import ApiError from '../exceptions/api.error';
import tokenService from '../services/token.service';
import { IUser } from '../types/user.types';

interface AuthRequest extends Request {
	user?: IUser;
}

export default function authMiddleware(request: AuthRequest, response: Response, next: NextFunction) {
	try {
		const authorizationHeader = request.headers.authorization;
		if (!authorizationHeader) {
			return next(ApiError.UnauthorizedError());
		}

		const accessToken = authorizationHeader.split(' ')[1];
		if (!accessToken) {
			return next(ApiError.UnauthorizedError());
		}

		const userData = tokenService.validateAccessToken({ accessToken });
		if (!userData) {
			return next(ApiError.UnauthorizedError());
		}

		request.user = userData;
		next();
	} catch (error) {
		next(ApiError.UnauthorizedError());
	}
}
