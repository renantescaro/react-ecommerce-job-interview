import { BASE_URL } from '../services/api';
import axios from 'axios';
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem('authToken');
		if (token) {
			setUser({ token });
		}
		setLoading(false);
	}, []);

	const login = async (login, password) => {
		try {
			// evita colocar o token
			const response = await axios.post(`${BASE_URL}/auth/login`, { login, password });
			const { user } = response.data;

			localStorage.setItem('authToken', user.token);

			setUser(user);
			return true;
		} catch (error) {
			console.error("Login falhou:", error);
			return false;
		}
	};

	const logout = () => {
		localStorage.removeItem('authToken');
		setUser(null);
	};

	const contextValue = {
		user,
		loading,
		isAuthenticated: !!user,
		login,
		logout
	};

	if (loading) {
		return <div>Carregando...</div>;
	}

	return (
		<AuthContext.Provider value={contextValue}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
