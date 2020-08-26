import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaListUl, FaUserPlus, FaSearch, FaBookOpen, FaUserEdit, FaTrashAlt, FaTimes, FaBook } from 'react-icons/fa';
import Modal from 'react-modal';

import Header from '../../components/Header/index';

import api from '../../services/api';
import './style.css';

export default function Client() {
    const [clients, setClients] = useState([]);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dateBirth, setDateBirth] = useState('');
    const [cpf, setCpf] = useState('');

    const [idClient, setIdClient] = useState('');
    const [selectedShowClient, setSelectedShowClient] = useState([]);
    const [totalClient, setTotalClient] = useState(0);
    
    const userId = localStorage.getItem('userId');

    const history = useHistory();

    useEffect(() => {
        api.get('clients', {
            headers: {
                Authorization: userId
            }
        }).then(response => {
            setClients(response.data);
            setTotalClient(response.headers['X-Total-Count']);
        })
    }, [userId]);

    function handleModalDelete(idClient) {
        setModalDeleteOpen(true);
        setIdClient(idClient);
    }

    async function handleDeleteClient(idClient) {
        try {

            await api.delete(`clients/${idClient}`, {
                headers: {
                    Authorization: userId,
                }
            });
            
            setClients(clients.filter(client => client.idClient !== idClient));
            
            setModalDeleteOpen(false);
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    async function handleNewClient(e) {
        e.preventDefault();

        const data = {
            name,
            address,
            phoneNumber,
            dateBirth,
            cpf,
        };

        try {
            await api.post('clients', data, {
                headers: {
                    Authorization: userId,
                }
            })

            history.push('/client');
        } catch (err) {
            alert('Erro ao cadastrar cliente, tente novamente.');
        }

    }

    function handleShowDataClient(idClient) {
        const alreadySelected = selectedShowClient.findIndex(client => client === idClient);

        if (alreadySelected > -1) {
            const filteredClient = selectedShowClient.filter(client => client !== idClient);
            
            setSelectedShowClient(filteredClient);

        } else {
            setSelectedShowClient([...selectedShowClient, idClient]);
        }
    }

    //Config. Modal    
    const [modalRegisterOpen, setModalRegisterOpen] = useState(false);

    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

    const styleModalRegister = {
        content: {
            width: '1000px', 
            height: '55vh',
            margin: 'auto auto', 
            background: '#f0f0f5', 
            border: '1px solid #171717'
        }
    }

    const styleModalDelete = {
        content: {
            width: '400px',
            height: '15vh',
            margin: '400px auto', 
            background: '#f0f0f5', 
            border: '1px solid #171717'
        }
    }

    return(
        <>
            <Header/>
            <div className="clientContainer">
                <div className="optionContent">
                    <form>
                        <div className="inputContainer">
                            <i className="icon"><FaSearch size={20} /></i>
                            <input className="input-field" type="text" name="name" placeholder="Procurar"  />
                        </div>
                    </form>
                    <div className="optionContainer">
                        <button className="btn-list">
                            <FaListUl size={18} />
                            Listar clientes
                        </button>
                        <button onClick={() => setModalRegisterOpen(true)} className="btn-list">
                            <FaUserPlus size={20} />
                            Cadastrar
                        </button>
                        <Modal 
                            isOpen={modalRegisterOpen} 
                            shouldCloseOnOverlayClick={false}  
                            onRequestClose={() => setModalRegisterOpen(false)} 
                            style={styleModalRegister}
                        >
                            <div className="modal-register">
                                <div className="modal-title">
                                    <FaUserPlus size={100} color={"#8F8F8F"}/>
                                    <h1>Novo cliente</h1>
                                    <button className="btn-close" type="button" onClick={() => setModalRegisterOpen(false)}><FaTimes size={22} title="Fechar"/></button>
                                </div>
                                <form onSubmit={handleNewClient}>
                                    <div className="ctn-perso">
                                        <h1>Pessoal</h1>
                                        <label>Nome</label>
                                        <input 
                                            type="text"
                                            placeholder="Ex: João Silva"
                                            value={name} 
                                            onChange={e => setName(e.target.value)} 
                                        />
                                        <label>Data nascimento</label>
                                        <input 
                                            type="date"
                                            value={dateBirth}
                                            onChange={e => setDateBirth(e.target.value)}  
                                        />
                                        <label>Telefone</label>
                                        <input 
                                            type="text"
                                            placeholder="Ex: (34)99999 9999"
                                            value={phoneNumber} 
                                            onChange={e => setPhoneNumber(e.target.value)} 
                                        />
                                        <label>CPF</label>
                                        <input 
                                            type="text"
                                            placeholder="Ex: 123.123.123-33"
                                            value={cpf}
                                            onChange={e => setCpf(e.target.value)}
                                        />
                                    </div>
                                    <div className="ctn-addr">
                                        <h1>Endereço</h1>
                                        <label>Rua</label>
                                        <input 
                                            type="text" 
                                            placeholder="Ex: Rua Tiradentes"
                                            value={address}
                                            onChange={e => setAddress(e.target.value)} 
                                        />
                                        <label>Número</label>
                                        <input
                                            type="text" 
                                            value={address}
                                            onChange={e => setAddress(e.target.value)} 
                                        />
                                        <label>Bairro</label>
                                        <input
                                            type="text" 
                                            value={address}
                                            onChange={e => setAddress(e.target.value)} 
                                        />
                                        <label>CEP</label>
                                        <input
                                            type="text"
                                            placeholder="Ex: 12345 000" 
                                            value={address}
                                            onChange={e => setAddress(e.target.value)} 
                                        />
                                    </div>
                                    <button className="btn-regist" type="submit">Cadastrar</button>
                                </form>
                            </div>    
                        </Modal>
                    </div>
                    <span>Total de clientes: {totalClient}</span>
                </div>
                <div className="clientShow">
                    <h1>Cadastrados recentemente</h1>
                    <ul className="list-client">
                        {clients.map(client => (
                        <li data-id={client.idClient} className="clientInfo" key={client.idClient}>
                            <div className="contName">
                                <span>{client.name}</span>
                                <div>
                                    <button type="button" className="option-list" onClick={() => handleShowDataClient(client.idClient)}>
                                        <div>
                                            {selectedShowClient.includes(client.idClient) ?
                                            <FaBookOpen size={20} title="Fechar" /> : 
                                            <FaBook size={20} title="Mostrar" /> }
                                        </div>    
                                    </button>
                                    <button type="button" className="option-list">
                                        <FaUserEdit size={22} title="Editar" />
                                    </button>
                                    <button type="button" className="option-list" onClick={() => handleModalDelete(client.idClient)}>
                                        <FaTrashAlt className="lixo" size={18} title="Excluir" />
                                    </button>
                                </div>
                            </div>
                            <div className={ selectedShowClient.includes(client.idClient) ? 'contInfo-active' : 'contInfo' } >
                                <ul>
                                    <li><span>Data de nasc: </span>{client.dateBirth}</li>
                                    <li><span>Telefone: </span>{client.phoneNumber}</li>
                                    <li><span>Email: </span>{client.email}</li>
                                    <li><span>CPF: </span>{client.cpf}</li>
                                    <h2><span></span>Endereço</h2>
                                    <li><span>Rua: </span>{client.address}</li>
                                    <li><span>Numero: </span>{client.addressNumber}</li>
                                    <li><span>Bairro: </span>{client.neighborhood}</li>
                                </ul>   
                            </div>
                        
                        </li>
                        ))}
                        
                    </ul>
                </div>
                <Modal 
                    className="modal-delete"  
                    isOpen={modalDeleteOpen} 
                    shouldCloseOnOverlayClick={false}  
                    onRequestClose={() => setModalDeleteOpen(false)} 
                    style={styleModalDelete}
                >
                    <p>Deseja realmente excluir este cliente ?</p>
                    <button className="btn-dlt" type="button" onClick={() => setModalDeleteOpen(false)} >Cancelar</button>
                    <button type="button" onClick={() => handleDeleteClient(idClient)}>Excluir</button>
                </Modal>
            </div>
        </>
    )
}