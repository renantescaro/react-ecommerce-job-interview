import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const success = await login(email, password);

		if (success) {
			navigate('/');
		} else {
			alert("Credenciais inválidas.");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Faça Login</h2>
			<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
			<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" required />
			<button type="submit">Entrar</button>
		</form>
	);
}

export default Login;
