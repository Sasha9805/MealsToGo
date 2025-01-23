import { useState, createContext } from "react";

import { loginRequest } from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);

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

	return (
		<AuthenticationContext.Provider
			value={{
				isAuthenticated: !!user,
				user,
				isLoading,
				error,
				onLogin,
			}}
		>
			{children}
		</AuthenticationContext.Provider>
	);
};
