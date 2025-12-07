import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8000/api/customers';

function CustomerList() {
	const [customers, setCustomers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchCustomers = async () => {
			try {
				setLoading(true);
				setError(null);

				const response = await axios.get(API_URL);

				setCustomers(response.data.data);

			} catch (err) {
				console.error("Erro ao buscar clientes:", err);
				setError("Não foi possível carregar os dados. Verifique o backend.");
				setCustomers([]);
			} finally {
				setLoading(false);
			}
		};

		fetchCustomers();
	}, []);

	if (loading) {
		return <h2>Carregando Clientes...</h2>;
	}

	if (error) {
		return <h2 style={{ color: 'red' }}>Erro: {error}</h2>;
	}

	if (customers.length === 0) {
		return <h2>Nenhum cliente encontrado.</h2>;
	}

	const handleNewCustomer = () => {
		navigate('/customer/new');
	};

	const handleDeleteCustomer = async (customerId, customerName) => {
		const isConfirmed = window.confirm(
			`Tem certeza que deseja apagar o cliente: ${customerName} (ID: ${customerId})?`
		);

		if (isConfirmed) {
			try {
				await axios.delete(`${API_URL}/${customerId}`);

				alert(`Cliente ${customerName} excluído com sucesso.`);
				setCustomers(customers.filter(c => c.id !== customerId));

			} catch (error) {
				console.error(`Erro ao deletar cliente ${customerId}:`, error);
				alert('Falha ao deletar cliente. Verifique o console.');
			}
		}
	};

	return (
		<div style={{ padding: '20px' }}>
			<h1>Lista de Clientes</h1>
			<br />
			<div>
				<button
					className='btn btn-success'
					onClick={handleNewCustomer}
				>
					Novo Cliente
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
					{customers.map(customer => (
						<tr key={customer.id}>
							<td>{customer.id}</td>
							<td>{customer.name}</td>
							<td>{customer.birthDate}</td>
							<td>{customer.cpf}</td>
							<td>{customer.phone}</td>
							<td>
								<button
									className='btn btn-danger'
									onClick={() => handleDeleteCustomer(customer.id, customer.name)}
								>Apagar
								</button>
							</td>
							<td><button className='btn btn-primary'>Editar</button></td>
						</tr>
					))}
				</tbody>
			</table>

			{/*
          <h4>Endereços:</h4>
          {customer.addresses && customer.addresses.length > 0 ? (
            <ul>
              {customer.addresses.map(address => (
                <li key={address.id} style={{ marginBottom: '5px' }}>
                  {address.street}, {address.number} - {address.city} ({address.state})
                  <br />
                  <small>CEP: {address.zipCode}</small>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum endereço cadastrado.</p>
          )}
          */}
		</div>
	);
}

export default CustomerList;
