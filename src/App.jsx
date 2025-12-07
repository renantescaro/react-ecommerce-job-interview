import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import CustomerForm from './components/customers/CustomerForm';
import CustomerList from './components/customers/CustomerList';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/customer/new" element={<CustomerForm />} />
            <Route path="/panel" element={<CustomerList />} /> 
          </Route>

          <Route path="*" element={<div>Página Não Encontrada</div>} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
