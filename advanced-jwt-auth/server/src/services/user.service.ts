import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';

import { User } from '../models/user.model';
import mailService from './mail.service';
import tokenService from './token.service';
import UserDto from '../dtos/user.dto';

class UserService {
	async registration({ email, password }: { email: string; password: string }): Promise<{
		accessToken: string;
		refreshToken: string;
		user: UserDto;
	}> {
		const candidate = await User.findOne({ email });
		if (candidate) {
			throw new Error(`User with ${email} already exists`);
		}

		const hashPassword = bcrypt.hashSync(password, 7);
		const activationLink = v4();

		const user = await User.create({ email, password: hashPassword, activationLink });

		// TODO: await
		mailService.sendActivationMail({
			toEmail: email,
			link: activationLink
		});

		const userDto = new UserDto(user);

		const tokens = tokenService.generateTokens({
			payload: userDto
		});

		await tokenService.saveToken({ refreshToken: tokens.refreshToken, userId: userDto.id });

		return { ...tokens, user: userDto };
	}
}

export default new UserService();
