import type { Request, Response, NextFunction } from 'express';
import userService from '../services/user.service';

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
			const { email, password } = request.body;
			const user = await userService.registration({ email, password });

			response.cookie('refreshToken', user.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true
				// secure: true,
			});

			response.status(200).json({ user });
		} catch (error) {
			console.error(error);
			response.status(500).json({ message: 'Registration error' });
		}
	}

	async login(request: Request, response: Response, next: NextFunction): Promise<void> {
		try {
		} catch (error) {
			console.error(error);
			response.status(500).json({ message: 'Login error' });
		}
	}

	async logout(request: Request, response: Response, next: NextFunction): Promise<void> {
		try {
		} catch (error) {
			console.error(error);
			response.status(500).json({ message: 'Logout error' });
		}
	}

	async activate(request: Request, response: Response, next: NextFunction): Promise<void> {
		try {
		} catch (error) {
			console.error(error);
			response.status(500).json({ message: 'Activation error' });
		}
	}

	async refresh(request: Request, response: Response, next: NextFunction): Promise<void> {
		try {
		} catch (error) {
			console.error(error);
			response.status(500).json({ message: 'Refresh token error' });
		}
	}

	async getUsers(request: Request, response: Response, next: NextFunction): Promise<any> {
		try {
			response.json({ users: ['123', '456'] });
		} catch (error) {
			console.error(error);
			response.status(500).json({ message: 'Fetching users error' });
		}
	}
}

export default new UserController();
