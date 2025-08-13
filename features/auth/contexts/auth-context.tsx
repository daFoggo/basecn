"use client";

import { redirect } from "next/navigation";
import type React from "react";
import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { PageLoading } from "@/components/common/page-loading";
import { getItem, removeItem, setItem } from "@/lib/utils/storage";
import { useAuthSWR } from "../hooks/use-auth-swr";
import type { IPostLogin, IPostRegister } from "../services/auth";
import type { IUser } from "../utils/types";

interface IAuthContext {
	user: IUser | undefined;
	isAuthenticated: boolean;
	isLoading: boolean;

	login: (credentials: IPostLogin) => Promise<void>;
	register: (userData: IPostRegister) => Promise<void>;
	logout: () => void;
	refreshUser: () => Promise<void>;

	isLoggingIn: boolean;
	isRegistering: boolean;

	resetLogin: () => void;
	resetRegister: () => void;

	loginError: Error | null;
	registerError: Error | null;
	userError: Error | null;
}

const STORAGE_KEYS = {
	ACCESS_TOKEN: "auth_access_token",
	REFRESH_TOKEN: "auth_refresh_token",
	USER: "auth_user",
};

const AuthContext = createContext<IAuthContext | null>(null);

interface IAuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
	const [isInitializing, setIsInitializing] = useState(true);

	const {
		user,
		isAuthenticated,
		isLoadingUser,
		userError,
		login: authLogin,
		register: authRegister,
		logout: authLogout,
		refreshUser: authRefreshUser,
		isLoggingIn,
		isRegistering,
		loginError,
		registerError,
		resetLogin,
		resetRegister,
	} = useAuthSWR();

	const clearStoredAuth = useCallback(() => {
		removeItem(STORAGE_KEYS.ACCESS_TOKEN);
		removeItem(STORAGE_KEYS.REFRESH_TOKEN);
		removeItem(STORAGE_KEYS.USER);
	}, []);

	const storeAuthData = useCallback((token: string, userData?: IUser) => {
		setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
		if (userData) {
			setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
		}
	}, []);

	const login = useCallback(
		async (credentials: IPostLogin) => {
			const response = await authLogin(credentials);
			if (response?.session.token) {
				storeAuthData(response.session.token, response.user);
			}
		},
		[authLogin, storeAuthData],
	);

	const register = useCallback(
		async (userData: IPostRegister) => {
			const response = await authRegister(userData);
			if (response?.session.token) {
				storeAuthData(response.session.token, response.user);
			}
		},
		[authRegister, storeAuthData],
	);

	const logout = useCallback(() => {
		clearStoredAuth();
		authLogout();
	}, [clearStoredAuth, authLogout]);

	const refreshUser = useCallback(async () => {
		await authRefreshUser();
		if (user) {
			setItem(STORAGE_KEYS.USER, JSON.stringify(user));
		}
	}, [authRefreshUser, user]);

	useEffect(() => {
		const initializeAuth = async () => {
			try {
				const accessToken = getItem(STORAGE_KEYS.ACCESS_TOKEN);
				const storedUser = getItem(STORAGE_KEYS.USER);

				if (accessToken && storedUser) {
					await authRefreshUser();
				}
			} catch (error) {
				console.error("Failed to initialize auth:", error);
			} finally {
				setIsInitializing(false);
			}
		};

		initializeAuth();
	}, [authRefreshUser]);

	const contextValue: IAuthContext = useMemo(
		() => ({
			user,
			isAuthenticated,
			isLoading: isInitializing || isLoadingUser,

			login,
			register,
			logout,
			refreshUser,

			isLoggingIn,
			isRegistering,

			loginError,
			registerError,
			userError,

			resetLogin,
			resetRegister,
		}),
		[
			user,
			isAuthenticated,
			isInitializing,
			isLoadingUser,
			login,
			register,
			logout,
			refreshUser,
			isLoggingIn,
			isRegistering,
			loginError,
			registerError,
			userError,
			resetLogin,
			resetRegister,
		],
	);

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};

export const useAuthContext = (): IAuthContext => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuthContext must be used within an AuthProvider");
	}

	return context;
};

export const withAuth = <P extends object>(
	Component: React.ComponentType<P>,
): React.ComponentType<P> => {
	return (props: P) => {
		const { isAuthenticated, isLoading } = useAuthContext();

		if (isLoading) {
			return <PageLoading />;
		}

		if (!isAuthenticated) {
			return redirect("/unauthorized");
		}

		return <Component {...props} />;
	};
};

export const useRequireAuth = () => {
	const { isAuthenticated, isLoading } = useAuthContext();

	return {
		isLoading,
		isAuthenticated,
		shouldRedirect: !isLoading && !isAuthenticated,
	};
};
