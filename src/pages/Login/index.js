import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';
import './style.css';

import logoImg from '../../assets/logo.png';

export default function Login() {
    const [nick, setNick] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', {nick, password});

            localStorage.setItem('userId', response.data.id);
            localStorage.setItem('nameCompany', response.data.nameCompany);

            history.push('/profile');
        } catch (err) {
            alert('Falha no login, tente novamente.');
        }
    }

    return (
        <div id="content-login">
                <section>
                    <img src={logoImg} alt="Personal Manager" className="logoImg" />
                    
                    <h1>Faça seu login</h1>
                    
                    <form onSubmit={handleLogin}>

                        <div className="input">
                        <input type="text" value={nick} onChange={e => setNick(e.target.value)}/>
                        <label>Usuário</label>
                        </div>
                        
                        <div className="input">
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                        <label>Senha</label>
                        </div>
                        
                        <button type="submit">Entrar</button>

                        <Link className="back-link" to="/register">
                            <FiLogIn  size={16} color="#E02041" />
                            Não tenho cadastro
                        </Link>
                    </form>
                </section>
        </div>
    );
}