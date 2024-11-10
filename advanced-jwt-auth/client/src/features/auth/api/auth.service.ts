import axios, { AxiosResponse } from 'axios';
import $api from '../../../shared/api/axios.instance';
import { AuthResponseType } from '../../../shared/model/types/auth.types';
import apiRoutes from '../../../shared/model/routes/api.routes';

export default class AuthService {
	static async login({
		email,
		password
	}: {
		email: string;
		password: string;
	}): Promise<AxiosResponse<AuthResponseType>> {
		return $api.post<AuthResponseType>(apiRoutes.login, { email, password });
	}

	static async registration({
		email,
		password
	}: {
		email: string;
		password: string;
	}): Promise<AxiosResponse<AuthResponseType>> {
		return $api.post<AuthResponseType>(apiRoutes.registration, { email, password });
	}

	static async logout(): Promise<void> {
		return $api.post(apiRoutes.logout);
	}

	static async checkAuth(): Promise<AxiosResponse<AuthResponseType>> {
		return await axios.get<AuthResponseType>(`${import.meta.env.VITE_API_URL}${apiRoutes.refresh}`, {
			withCredentials: true
		});
	}
}
