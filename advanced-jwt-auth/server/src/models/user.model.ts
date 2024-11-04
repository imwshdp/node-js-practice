import { Schema, model, Document } from 'mongoose';
import { IUser } from '../types/models/user';

const userSchema = new Schema<IUser>({
	email: {
		type: String,
		unique: true,
		required: true
	},

	password: {
		type: String,
		required: true
	},

	isActivated: {
		type: Boolean,
		default: false
	},

	activationLink: {
		type: String
	}
});

export const User = model<IUser>('User', userSchema);
