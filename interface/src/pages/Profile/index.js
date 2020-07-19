import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';

import api from '../../services/api';

import './style.css';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/')
    }

    return(
        <div className="profile-container">
            <header>
                <span>Olá, <b>{ongName}</b> é bom te ver de volta!</span>

                <Link className="button" to="/incidents/new">Quer cadastrar uma vaga?</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#FF8B4A" />
                </button>
            </header>

            <h1>Estas são as suas vagas cadastradas.</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                    <strong>Vaga:</strong>
                    <p>{incident.title}</p>

                    <strong>Requisitos:</strong>
                    <p>{incident.description}</p>

                    <strong>Salário:</strong>
                    <p>{Intl.NumberFormat('pt-BR',  { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                    <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color="#FF8B4A" />
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );
}