import { IUser } from '../types/models/user';

class UserDto {
	email: string;
	id: string;
	isActivated: boolean;

	constructor(user: IUser) {
		this.email = user.email;
		this.id = String(user._id);
		this.isActivated = user.isActivated;
	}
}

export default UserDto;
