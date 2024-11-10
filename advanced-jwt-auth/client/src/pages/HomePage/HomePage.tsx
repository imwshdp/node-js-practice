import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useAuth } from '@/features/auth/context/AuthContext';
import { ACCESS_TOKEN_KEY } from '@/shared/model/constants';

import styles from './HomePage.module.css';
import { UserType } from '@/shared/model/types/user.types';
import UserService from '@/entities/user/api/users.service';
import { handleError } from '@/shared/lib/handleError';

const getUsers = async () => {
	try {
		const response = await UserService.getUsers();
		return response.data.users;
	} catch (error: unknown) {
		handleError(error);
	}
};

const HomePage: FC = () => {
	const context = useAuth();
	const { checkAuth, isAuthenticated, user, logout, isLoading } = context;

	const navigate = useNavigate();
	const goToLoginPage = () => navigate('/login');

	useEffect(() => {
		if (localStorage.getItem(ACCESS_TOKEN_KEY)) {
			checkAuth();
		} else {
			goToLoginPage();
		}
	}, []);

	const logoutHandler = () => {
		logout().then(goToLoginPage);
	};

	const [users, setUsers] = useState<UserType[]>([]);

	const getUsersHandler = () => {
		getUsers().then((users) => users && setUsers(users));
	};

	if (isLoading) {
		return (
			<section className={styles.page}>
				<span className={styles.loading}>Loading...</span>
			</section>
		);
	}

	if (!isAuthenticated) {
		goToLoginPage();
	}

	return (
		<section className={styles.page}>
			<div className={styles.section}>
				<h1>{`Welcome back, ${user.email}`}</h1>
				<span>
					Account status: <b>{user.isActivated ? 'activated' : 'not activated'}</b>
				</span>

				<button onClick={logoutHandler}>Logout</button>
				<button onClick={getUsersHandler}>Get Users</button>

				{users.length > 0 && (
					<ul className={styles.list}>
						{users.map((user) => (
							<li className={styles.user} key={user.id}>
								{user.email}
							</li>
						))}
					</ul>
				)}
			</div>
		</section>
	);
};

export default observer(HomePage);
