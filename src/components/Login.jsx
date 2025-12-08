import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


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
            alert("Credenciais inválidas. Tente novamente.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            
            <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px' }}>
                <div className="card-body">
                    
                    <h2 className="card-title text-center mb-4">Login</h2>
                    
                    <form onSubmit={handleSubmit}>
                        
                        <div className="mb-3">
                            <label htmlFor="emailInput" className="form-label">Email</label>
                            <input 
                                id="emailInput"
                                type="email" 
                                className="form-control" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="nome@exemplo.com" 
                                required 
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="passwordInput" className="form-label">Senha</label>
                            <input 
                                id="passwordInput"
                                type="password" 
                                className="form-control" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="Sua senha" 
                                required 
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            className="btn btn-primary w-100"
                        >
                            Entrar
                        </button>
                    </form>
                    
                </div>
            </div>
            
        </div>
    );
}

export default Login;