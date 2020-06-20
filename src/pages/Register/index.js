import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './style.css';

import logoImg from '../../assets/logo.png';

export default function Register() {
    const [nick, setNick] = useState('');
    const [password, setPassword] = useState('');
    const [nameCompany, setnameCompany] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            nick,
            nameCompany,
            password
        };

        try{
            await api.post('users', data);
            
            alert(`Seu cadastro foi efetuado com sucesso. Aproveite ${data.nick}.`);
            
            history.push('/');
        } catch (err) {
            alert('Erro no cadastro, tente novamente.')
        }
    }


    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Personal Manager" className="logoImg"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e gerencie sua empresa de uma maneira facíl e moderna.</p>

                    <Link className="back-link" to="/">
                            <FiArrowLeft  size={16} color="#E02041" />
                            Já sou cadastrado
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome do usuário" 
                        value={nick}
                        onChange={e => setNick(e.target.value)}
                    />
                    <input 
                        placeholder="Nome da Empresa" 
                        value={nameCompany}
                        onChange={e => setnameCompany(e.target.value)}
                    />
                    <input 
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)} 
                    />
                    <input 
                        type="password"
                        placeholder="Confirmar senha" 
                    />
                    <button className="button" type="submit">Cadastrar</button> 
                </form>
            </div>
        </div>
    );
}
