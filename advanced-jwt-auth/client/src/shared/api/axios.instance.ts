import axios from 'axios';
import { ACCESS_TOKEN_KEY } from '../model/constants';
import AuthService from '@/features/auth/api/auth.service';

const $api = axios.create({
	withCredentials: true,
	baseURL: String(import.meta.env.VITE_API_URL)
});

$api.interceptors.request.use(
	(config) => {
		config.headers.Authorization = `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

$api.interceptors.response.use(
	(config) => {
		return config;
	},
	async (error) => {
		const originalRequest = error.config;
		if (error.response.status == 401 && error.config && !error.config._isRetry) {
			originalRequest._isRetry = true;
			try {
				const response = await AuthService.checkAuth();
				localStorage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken);
				return $api.request(originalRequest);
			} catch {
				console.error('User is not authorized');
			}
		}
		throw error;
	}
);

export default $api;
