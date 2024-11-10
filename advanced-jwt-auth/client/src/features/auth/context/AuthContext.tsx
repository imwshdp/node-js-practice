import { createContext, FC, PropsWithChildren, useContext } from 'react';
import { useAuthStore, authStore } from '../model/auth.store';

type AuthContextType = ReturnType<typeof useAuthStore>;

const AuthContext = createContext<AuthContextType>(authStore);

export const useAuth = () => {
	const context = useContext(AuthContext);
	return context;
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	return <AuthContext.Provider value={authStore}>{children}</AuthContext.Provider>;
};
