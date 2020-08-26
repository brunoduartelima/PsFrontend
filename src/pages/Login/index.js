import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import image from '../../assets/img-bottom.jpg';
import logo from '../../assets/logo.png';

import './style.css';

export default function Login() {
    const history = useHistory();

    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');

    async function handleLogin(event) {
        event.preventDefault();

        try {
            const response = await api.post('sessions', { emailLogin, passwordLogin });

            localStorage.setItem('userId', response.data.id);
            localStorage.setItem('nameCompany', response.data.nameCompany);

            history.push('/profile');
        } catch (err) {
            alert('Falha no login, tente novamente.');
        }
    }

    return(
        <div id="container-login">
            
            <img className="img-bottom" src={image} alt="imagem"/>
            
            <div className="content-login">
                
                <form onSubmit={handleLogin}>
                    <img src={logo} alt="PsManager"/>
                    <h2>Entrar</h2>

                    <div className="field">
                    <input 
                        required 
                        name="email" 
                        type="email"
                        value={emailLogin}
                        onChange={e => setEmailLogin(e.target.value)} 
                    />
                    <label>E-mail</label>
                    </div>


                    <div className="field">
                    <input 
                        required 
                        type="password" 
                        name="password"
                        value={passwordLogin}
                        onChange={e => setPasswordLogin(e.target.value)}  
                    />
                    <label>Senha</label>
                    </div>

                    <p>Não tem uma conta? <Link className="link" to="/">Crie uma!</Link></p>
                    
                    <button type="submit">Acessar</button>
                </form>

            </div>
        </div>  
    );
}