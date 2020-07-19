import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import loginImg from '../../assets/illustration.svg';

export default function Login() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', {id});

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            
            history.push('/profile');

        } catch (err) {
            alert('Falha ao logar, tente novamente.')
        }
    }

    return(
        <div className="Login-container">
            <section className="form">

                <form onSubmit={handleLogin}>
                    <h1>Acessar conta</h1>

                    <input 
                        placeholder="Seu ID"
                        type="password"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#FF8B4A"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={loginImg} alt="Login" />
        </div>
    );
}