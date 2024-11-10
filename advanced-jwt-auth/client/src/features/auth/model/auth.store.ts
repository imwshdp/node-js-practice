import { makeAutoObservable } from 'mobx';

import { handleError } from '@/shared/lib/handleError';
import { ACCESS_TOKEN_KEY } from '@/shared/model/constants';
import { UserType } from '@/shared/model/types/user.types';
import AuthService from '@/features/auth/api/auth.service';

class AuthStore {
	public user: UserType = {} as UserType;
	public isAuthenticated: boolean = false;
	public isLoading: boolean = false;

	constructor() {
		makeAutoObservable(this);
	}

	setIsAuthenticated(status: boolean) {
		this.isAuthenticated = status;
	}

	setUser(user: UserType) {
		this.user = user;
	}

	setLoading(status: boolean) {
		this.isLoading = status;
	}

	login = async ({ email, password }: { email: string; password: string }) => {
		try {
			const response = await AuthService.login({ email, password });

			localStorage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken);
			this.setIsAuthenticated(true);

			const user = response.data.user;

			this.setUser(user);
		} catch (error: unknown) {
			handleError(error);
		}
	};

	registration = async ({ email, password }: { email: string; password: string }) => {
		try {
			const response = await AuthService.registration({ email, password });

			localStorage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken);
			this.setIsAuthenticated(true);

			const user = response.data.user;
			this.setUser(user);
		} catch (error: unknown) {
			handleError(error);
		}
	};

	logout = async () => {
		try {
			await AuthService.logout();

			localStorage.removeItem(ACCESS_TOKEN_KEY);
			this.setIsAuthenticated(false);

			this.setUser({} as UserType);
		} catch (error: unknown) {
			handleError(error);
		}
	};

	checkAuth = async () => {
		if (this.isLoading) return;

		this.setLoading(true);

		try {
			const {
				data: { accessToken, user }
			} = await AuthService.checkAuth();

			localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

			this.setIsAuthenticated(true);
			this.setUser(user);
		} catch (error: unknown) {
			handleError(error);
		} finally {
			this.setLoading(false);
		}
	};
}

export const authStore = new AuthStore();
export const useAuthStore = () => authStore;
