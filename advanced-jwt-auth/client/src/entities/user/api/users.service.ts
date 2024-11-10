import { AxiosResponse } from 'axios';
import { UserType } from '../../../shared/model/types/user.types';
import $api from '../../../shared/api/axios.instance';
import apiRoutes from '../../../shared/model/routes/api.routes';

export default class UserService {
	static async getUsers(): Promise<AxiosResponse<{ users: UserType[] }>> {
		return await $api.get<{ users: UserType[] }>(apiRoutes.users);
	}
}
