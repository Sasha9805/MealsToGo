import { useState, createContext } from "react";

import {
	loginRequest,
	signUpRequest,
	checkUser,
	logOutRequest,
} from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);

	checkUser((usr) => {
		setUser(usr);
	});

	const onLogin = (email, password) => {
		setIsLoading(true);
		loginRequest(email, password)
			.then((u) => {
				setUser(u);
				setIsLoading(false);
			})
			.catch((err) => {
				setIsLoading(false);
				setError(err);
				console.log(err);
			});
	};

	const onRegister = (email, password, repeatedPassword) => {
		if (password !== repeatedPassword) {
			setError(new Error("Error: Passwords do not match"));
			return;
		}
		setIsLoading(true);
		signUpRequest(email, password)
			.then((u) => {
				setUser(u);
				setIsLoading(false);
			})
			.catch((e) => {
				setIsLoading(false);
				setError(e);
			});
	};

	const onLogout = () => {
		logOutRequest().then(() => {
			setUser(null);
			setError(null);
		});
	};

	return (
		<AuthenticationContext.Provider
			value={{
				isAuthenticated: !!user,
				user,
				isLoading,
				error,
				onLogin,
				onRegister,
				onLogout,
			}}
		>
			{children}
		</AuthenticationContext.Provider>
	);
};
