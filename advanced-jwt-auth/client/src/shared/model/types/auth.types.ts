import { UserType } from './user.types';

export type AuthResponseType = {
	accessToken: string;
	refreshToken: string;
	user: UserType;
};
