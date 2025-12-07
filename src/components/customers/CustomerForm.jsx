import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8000/api/customers';

function CustomerForm() {
    const navigate = useNavigate();

    const [customer, setCustomer] = useState({
        name: '',
        birth_date: '',
        cpf: '',
        rg: '',
        phone: '',
    });

    const [addresses, setAddresses] = useState([
        {
            street: '',
            number: '',
            city: '',
            state: '',
            zip_code: '',
        },
    ]);

    const handleCustomerChange = (e) => {
        const { id, value } = e.target;
        setCustomer(prevCustomer => ({
            ...prevCustomer,
            [id]: value,
        }));
    };

    const handleAddressChange = (index, e) => {
        const { id, value } = e.target;
        const newAddresses = addresses.map((addr, i) => {
            if (i === index) {
                return { ...addr, [id]: value };
            }
            return addr;
        });
        setAddresses(newAddresses);
    };

    const handleAddAddress = () => {
        setAddresses([
            ...addresses,
            {
                street: '',
                number: '',
                city: '',
                state: '',
                zip_code: '',
            },
        ]);
    };

    const handleRemoveAddress = (index) => {
        if (addresses.length > 1) {
            setAddresses(addresses.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const finalData = {
            customer: customer,
            addresses: addresses,
        };

        try {
            const response = await axios.post(API_URL, finalData);

            console.log('Cliente criado com sucesso:', response.data);
            alert('Cliente criado com sucesso!');

            navigate('/panel');

        } catch (error) {
            console.error('Erro ao criar cliente:', error.response ? error.response.data : error.message);
            alert('Falha ao criar cliente. Verifique o console.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Criar Novo Cliente</h2>
            <br />
            <form onSubmit={handleSubmit}>

                <div className="row mb-4">
                    <div className="form-group col-md-6">
                        <label htmlFor="name">Nome</label>
                        <input
                            id="name"
                            type="text"
                            className="form-control"
                            value={customer.name}
                            onChange={handleCustomerChange}
                            required
                        />
                    </div>

                    <div className="form-group col-md-3">
                        <label htmlFor="birth_date">Data Nascimento</label>
                        <input
                            id="birth_date"
                            type="date"
                            className="form-control"
                            value={customer.birth_date}
                            onChange={handleCustomerChange}
                            required
                        />
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="form-group col-md-3">
                        <label htmlFor="cpf">CPF</label>
                        <input
                            id="cpf"
                            type="text"
                            className="form-control"
                            value={customer.cpf}
                            onChange={handleCustomerChange}
                            required
                        />
                    </div>

                    <div className="form-group col-md-3">
                        <label htmlFor="rg">RG</label>
                        <input
                            id="rg"
                            type="text"
                            className="form-control"
                            value={customer.rg}
                            onChange={handleCustomerChange}
                        />
                    </div>

                    <div className="form-group col-md-3">
                        <label htmlFor="phone">Telefone</label>
                        <input
                            id="phone"
                            type="text"
                            className="form-control"
                            value={customer.phone}
                            onChange={handleCustomerChange}
                            required
                        />
                    </div>
                </div>

                <h3 className="mt-5">Endereços Cadastrados</h3>

                {addresses.map((address, index) => (
                    <div key={index} className="border p-4 mb-4 bg-light rounded">

                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5>Endereço #{index + 1}</h5>
                            {addresses.length > 1 && (
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleRemoveAddress(index)}
                                >
                                    Remover
                                </button>
                            )}
                        </div>

                        <div className="row">
                            <div className="form-group col-md-6">
                                <label htmlFor={`street-${index}`}>Rua</label>
                                <input
                                    id="street"
                                    type="text"
                                    className="form-control"
                                    value={address.street}
                                    onChange={(e) => handleAddressChange(index, e)}
                                    required
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor={`number-${index}`}>Número</label>
                                <input
                                    id="number"
                                    type="text"
                                    className="form-control"
                                    value={address.number}
                                    onChange={(e) => handleAddressChange(index, e)}
                                    required
                                />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor={`zip_code-${index}`}>CEP</label>
                                <input
                                    id="zip_code"
                                    type="text"
                                    className="form-control"
                                    value={address.zip_code}
                                    onChange={(e) => handleAddressChange(index, e)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="form-group col-md-4">
                                <label htmlFor={`city-${index}`}>Cidade</label>
                                <input
                                    id="city"
                                    type="text"
                                    className="form-control"
                                    value={address.city}
                                    onChange={(e) => handleAddressChange(index, e)}
                                    required
                                />
                            </div>
                            <div className="form-group col-md-2">
                                <label htmlFor={`state-${index}`}>Estado</label>
                                <input
                                    id="state"
                                    type="text"
                                    className="form-control"
                                    value={address.state}
                                    onChange={(e) => handleAddressChange(index, e)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    className="btn btn-secondary btn-sm mb-4"
                    onClick={handleAddAddress}
                >
                    + Adicionar Outro Endereço
                </button>

                <br />

                <button type="submit" className="btn btn-primary mt-3">
                    Salvar Cliente
                </button>
            </form>
        </div>
    );
}

export default CustomerForm;
