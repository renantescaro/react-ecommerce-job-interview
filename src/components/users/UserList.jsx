import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8000/api/users';

function UserList() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				setLoading(true);
				setError(null);

				const response = await axios.get(API_URL);

				setUsers(response.data.data);

			} catch (err) {
				console.error("Erro ao buscar usuários:", err);
				setError("Não foi possível carregar os dados. Verifique o backend.");
				setUsers([]);
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, []);

	if (loading) {
		return <h2>Carregando usuários...</h2>;
	}

	if (error) {
		return <h2 style={{ color: 'red' }}>Erro: {error}</h2>;
	}

	if (users.length === 0) {
		return <h2>Nenhum usuário encontrado.</h2>;
	}

	const handleNewUser = () => {
		navigate('/user/new');
	};

	const handleDeleteUser = async (userId, userName) => {
		const isConfirmed = window.confirm(
			`Tem certeza que deseja apagar o usuário: ${userName} (ID: ${userId})?`
		);

		if (isConfirmed) {
			try {
				await axios.delete(`${API_URL}/${userId}`);

				alert(`Usuário ${userName} excluído com sucesso.`);
				setUsers(users.filter(c => c.id !== userId));

			} catch (error) {
				console.error(`Erro ao deletar usuário ${userId}:`, error);
				alert('Falha ao deletar usuário. Verifique o console.');
			}
		}
	};

	return (
		<div style={{ padding: '20px' }}>
			<h1>Lista de Usuários</h1>
			<br />
			<div>
				<button
					className='btn btn-success'
					onClick={handleNewUser}
				>
					Novo Usuário
				</button>
			</div>
			<table className='table table-striped'>
				<thead>
					<tr>
						<th>Id</th>
						<th>Nome</th>
						<th>Data Nascimento</th>
						<th>CPF</th>
						<th>Telefone</th>
					</tr>
				</thead>
				<tbody>
					{users.map(user => (
						<tr key={user.id}>
							<td>{user.id}</td>
							<td>{user.name}</td>
							<td>{user.birthDate}</td>
							<td>{user.cpf}</td>
							<td>{user.phone}</td>
							<td>
								<button
									className='btn btn-danger'
									onClick={() => handleDeleteUser(user.id, user.name)}
								>Apagar
								</button>
							</td>
							<td><button className='btn btn-primary'>Editar</button></td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default UserList;
