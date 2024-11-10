import { Document } from 'mongoose';
import { IUser } from './user.types';

export interface IToken extends Document {
	user: IUser;
	refreshToken: string;
}
