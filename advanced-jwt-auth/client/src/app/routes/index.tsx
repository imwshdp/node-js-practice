import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { LoginPage } from '@/pages/LoginPage';
import { HomePage } from '@/pages/HomePage';

const AppRouter: FC = () => {
	return (
		<Router>
			<Routes>
				<Route index path='/' element={<HomePage />} />
				<Route index path='/login' element={<LoginPage />} />
				<Route path='*' element={<HomePage />} />
			</Routes>
		</Router>
	);
};

export default AppRouter;
