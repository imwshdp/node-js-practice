import type { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import userService from '../services/user.service';
import ApiError from '../exceptions/api.error';
import tokenService from '../services/token.service';

class UserController {
	async registration(
		request: Request<
			{},
			{},
			{
				email: string;
				password: string;
			}
		>,
		response: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const errors = validationResult(request);
			if (!errors.isEmpty()) {
				next(
					ApiError.BadRequest(
						'Registration error',
						errors.array().map((error) => error.msg)
					)
				);
			}

			const { email, password } = request.body;
			const tokensWithUser = await userService.registration({ email, password });

			response.cookie('refreshToken', tokensWithUser.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
				// secure: true,
			});

			response.status(200).json(tokensWithUser);
		} catch (error) {
			next(error);
		}
	}

	async login(
		request: Request<
			{},
			{},
			{
				email: string;
				password: string;
			}
		>,
		response: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { email, password } = request.body;

			const tokensWithUser = await userService.login({ email, password });

			response.cookie('refreshToken', tokensWithUser.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
			});

			response.status(200).json(tokensWithUser);
		} catch (error) {
			next(error);
		}
	}

	async logout(request: Request, response: Response, next: NextFunction): Promise<void> {
		try {
			const refreshToken = request.cookies.refreshToken;
			await tokenService.removeToken({ refreshToken });

			response.clearCookie('refreshToken');
			response.sendStatus(200);
		} catch (error) {
			next(error);
		}
	}

	async activate(request: Request, response: Response, next: NextFunction): Promise<void> {
		try {
			const CLIENT_URL = process.env.CLIENT_URL;
			if (!CLIENT_URL) {
				throw new Error('Client url environment variable is not defined');
			}

			const activationLink = request.params.link;
			await userService.activate({ activationLink });
			return response.redirect(CLIENT_URL);
		} catch (error) {
			next(error);
		}
	}

	async refresh(request: Request, response: Response, next: NextFunction): Promise<void> {
		try {
			const refreshToken = request.cookies.refreshToken;

			const tokensWithUser = await userService.refresh({ refreshToken });

			response.cookie('refreshToken', tokensWithUser.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
			});

			response.status(200).json(tokensWithUser);
		} catch (error) {
			next(error);
		}
	}

	async getUsers(request: Request, response: Response, next: NextFunction): Promise<any> {
		try {
			const users = await userService.getAllUsers();
			response.json({ users });
		} catch (error) {
			next(error);
		}
	}
}

export default new UserController();
