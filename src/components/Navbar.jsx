import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">Fire Ecommerce</Link>

				<div className="collapse navbar-collapse">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className="nav-link" to="/customer">Clientes</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/user">Usuários</Link>
						</li>
					</ul>
				</div>

				<div className="d-flex">
					{user && (
						<>
							<span className="navbar-text me-3">
								Bem-vindo, {user.name || 'Usuário'}
							</span>
							<button onClick={handleLogout} className="btn btn-outline-danger">
								Sair
							</button>
						</>
					)}
				</div>
			</div>
		</nav>
	);
}

export default Navbar;