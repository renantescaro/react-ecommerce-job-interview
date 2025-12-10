import api from '../../services/api';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const USERS_ENDPOINT = '/users';

function UserForm() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const isEditing = !!userId;

    const [user, setUser] = useState({
        name: '',
        login: '',
        password: '',
    });

    useEffect(() => {
        if (isEditing) {
            const fetchUserData = async () => {
                try {
                    const response = await api.get(`${USERS_ENDPOINT}/${userId}`);
                    const data = response.data.data;

                    setUser({
                        name: data.name,
                        login: data.login,
                        password: data.password,
                    });

                } catch (error) {
                    console.error("Erro ao carregar dados para edição:", error);
                    alert("Usuário não encontrado ou erro ao carregar dados.");
                    navigate('/user');
                }
            };
            fetchUserData();
        }
    }, [isEditing, userId, navigate]);

    const handleUserChange = (e) => {
        const { id, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const finalData = {
            user: user,
        };

        try {
            let response;
            if (isEditing) {
                response = await api.put(`${USERS_ENDPOINT}/${userId}`, finalData);
                alert('Usuário alterado com sucesso!');
            } else {
                response = await api.post(USERS_ENDPOINT, finalData);
                alert('Usuário criado com sucesso!');
            }

            console.log('request enviada com sucesso:', response.data);

            navigate('/user');

        } catch (error) {
            console.error('Erro na request:', error.response ? error.response.data : error.message);
            alert('Falha no sistema');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Criar Novo Usuário</h2>
            <br />
            <form onSubmit={handleSubmit}>

                <div className="row mb-4">
                    <div className="form-group col-md-6">
                        <label htmlFor="name">Nome</label>
                        <input
                            id="name"
                            type="text"
                            className="form-control"
                            value={user.name}
                            onChange={handleUserChange}
                            required
                        />
                    </div>

                    <div className="form-group col-md-3">
                        <label htmlFor="login">Login</label>
                        <input
                            id="login"
                            type="email"
                            className="form-control"
                            value={user.login}
                            onChange={handleUserChange}
                            required
                        />
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="form-group col-md-3">
                        <label htmlFor="password">Senha</label>
                        <input
                            id="password"
                            type="password"
                            className="form-control"
                            value={user.password}
                            onChange={handleUserChange}
                            required
                        />
                    </div>
                </div>

                <br />

                <button type="submit" className="btn btn-primary mt-3">
                    Salvar Usuário
                </button>
            </form>
        </div>
    );
}

export default UserForm;
