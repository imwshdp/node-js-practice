import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@shared/assets/styles/index.css';

import { App } from '@/app/ui/App';
import { AuthProvider } from '@features/auth/context/AuthContext';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthProvider>
			<App />
		</AuthProvider>
	</StrictMode>
);
