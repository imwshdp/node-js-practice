import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';

import { User } from '../models/user.model';
import mailService from './mail.service';
import tokenService from './token.service';
import UserDto from '../dtos/user.dto';
import ApiError from '../exceptions/api.error';
import { DeleteResult } from 'mongoose';

class UserService {
	async registration({ email, password }: { email: string; password: string }): Promise<{
		accessToken: string;
		refreshToken: string;
		user: UserDto;
	}> {
		const { API_URL, PORT } = process.env;
		if (!API_URL || !PORT) {
			throw new Error('Service url or port environment variable is not defined');
		}

		const candidate = await User.findOne({ email });
		if (candidate) {
			throw ApiError.BadRequest(`User with ${email} already exists`);
		}

		const hashPassword = bcrypt.hashSync(password, 7);
		const activationLink = v4();

		const user = await User.create({ email, password: hashPassword, activationLink });

		await mailService.sendActivationMail({
			toEmail: email,
			link: `${API_URL}:${PORT}/api/activate/${activationLink}`
		});

		const userDto = new UserDto(user);

		const tokens = tokenService.generateTokens({
			payload: { ...userDto }
		});

		await tokenService.saveToken({ refreshToken: tokens.refreshToken, userId: userDto.id });

		return {
			...tokens,
			user: userDto
		};
	}

	async activate({ activationLink }: { activationLink: string }) {
		const user = await User.findOne({
			activationLink
		});
		if (!user) {
			throw ApiError.BadRequest('Invalid activation link');
		}

		user.isActivated = true;
		await user.save();
	}

	async login({ email, password }: { email: string; password: string }): Promise<{
		accessToken: string;
		refreshToken: string;
		user: UserDto;
	}> {
		const user = await User.findOne({ email });
		if (!user) {
			throw ApiError.BadRequest(`User with ${email} not found`);
		}

		const isPasswordEquals = bcrypt.compareSync(password, user.password);
		if (!isPasswordEquals) {
			throw ApiError.BadRequest('Wrong password');
		}

		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({
			payload: { ...userDto }
		});

		await tokenService.saveToken({
			refreshToken: tokens.refreshToken,
			userId: userDto.id
		});

		return {
			...tokens,
			user: userDto
		};
	}

	async logout({ refreshToken }: { refreshToken: string }): Promise<DeleteResult> {
		const token = await tokenService.removeToken({ refreshToken });
		if (!token) {
			throw ApiError.BadRequest('Invalid token deletion');
		}
		return token;
	}

	async refresh({ refreshToken }: { refreshToken: string }) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError();
		}

		const userData = tokenService.validateRefreshToken({ refreshToken });
		const token = await tokenService.findToken({ refreshToken });

		if (!userData || !token) {
			throw ApiError.UnauthorizedError();
		}

		const user = await User.findById(userData.id);
		if (!user) {
			throw new Error("User doesn't exist");
		}

		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({
			payload: { ...userDto }
		});

		await tokenService.saveToken({
			refreshToken: tokens.refreshToken,
			userId: userDto.id
		});

		return {
			...tokens,
			user: userDto
		};
	}

	async getAllUsers() {
		const users = await User.find();
		return users;
	}
}

export default new UserService();
