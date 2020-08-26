import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiShoppingCart, FiBarChart, FiClipboard, FiUsers, FiLink, FiMenu } from 'react-icons/fi';

import './style.css';

import logoImg from '../../assets/logo2.png';

export default function Header() {
    
    const nameCompany = localStorage.getItem('nameCompany');

    const history = useHistory();

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
            <header id="container-header">
                
                <div className="box-logo">
                    <Link className="logo" to="/profile" >
                        <img src={logoImg} alt="PsManager" />
                        <h3>PsManager</h3>
                    </Link>  
                </div>    
                
                <nav className="content">
                    <ul className="menu">
                        <li>
                            <Link className="option" to="/client">
                                <FiUsers size={20} color="#fff"/>
                                Cliente
                            </Link>
                        </li>
                        <li>
                            <Link className="option" to="/collaborator">
                                <FiLink size={20} color="#fff"/>
                                Colaborador
                            </Link>
                        </li>
                        <li>
                            <Link className="option" to="/sales">
                                <FiShoppingCart size={20} color="#fff"/>
                                Vendas
                            </Link>
                        </li>
                        <li>
                            <Link className="option" to="/financial">
                                <FiBarChart size={20} color="#fff"/>
                                Financeiro
                            </Link>
                        </li>
                        <li>
                            <Link className="option" to="/stock">
                                <FiClipboard size={20} color="#fff"/>
                                Produtos
                            </Link>
                        </li>
                    </ul>
                </nav>
                
                <div className="shortcuts">
                <span>Bem-Vindo, {nameCompany}</span>
                    <button type="button"><FiPower onClick={handleLogout} className="iconLogout" size={23} color="#fff" /></button>
                </div>
                <div className="menu-inner">
                    <button><FiMenu size={23} color="#fff"/></button>
                </div>
            </header>
    )
}