import { Document } from 'mongoose';
import { IUser } from './user';

export interface IToken extends Document {
	user: IUser;
	refreshToken: string;
}
