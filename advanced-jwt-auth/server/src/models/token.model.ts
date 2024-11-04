import { Schema, model, Document } from 'mongoose';
import { IUser } from '../types/models/user';

export interface IToken extends Document {
	user: IUser;
	refreshToken: string;
}

const tokenSchema = new Schema<IToken>({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},

	refreshToken: {
		type: String,
		required: true
	}
});

export const Token = model<IToken>('Token', tokenSchema);
