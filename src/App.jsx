import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import CustomerForm from './components/customers/CustomerForm';
import CustomerList from './components/customers/CustomerList';
import Dashboard from './components/Dashboard';
import MainLayout from './components/MainLayout';
import UserList from './components/users/UserList';

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />} />

					<Route element={<ProtectedRoute />}>
						<Route element={<MainLayout />}>
							<Route path="/" element={<Dashboard />} />
							<Route path="/customer/new" element={<CustomerForm />} />
							<Route path="/customer/edit/:customerId" element={<CustomerForm />} />
							<Route path="/customer" element={<CustomerList />} />
							<Route path="/user" element={<UserList />} />
						</Route>
					</Route>

					<Route path="*" element={<div>Página Não Encontrada</div>} />

				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
