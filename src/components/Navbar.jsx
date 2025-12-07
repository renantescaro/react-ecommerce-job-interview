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
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#333', color: 'white' }}>
      <div>
        <Link to="/" style={{ color: 'white', margin: '0 10px' }}>Início</Link>
        <Link to="/perfil" style={{ color: 'white', margin: '0 10px' }}>Perfil</Link>
      </div>
      <div>
        {user ? (
          <>
            <span>Bem-vindo, {user.nome || 'Usuário'}</span> 
            <button onClick={handleLogout} style={{ marginLeft: '20px' }}>Sair</button>
          </>
        ) : (
          <Link to="/login" style={{ color: 'white' }}>Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
