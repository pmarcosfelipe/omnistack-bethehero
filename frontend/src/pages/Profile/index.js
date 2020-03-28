import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import './styles.css';

export default function Profile() {
  const ongID = localStorage.getItem('ongID');
  const ongName = localStorage.getItem('ongName');

  const [incidents, setIncidentes] = useState([]);

  useEffect(() => {
    api
      .get('profile', {
        headers: {
          Authorization: ongID
        }
      })
      .then(response => {
        setIncidentes(response.data);
      });
  }, [ongID]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: { Authorization: ongID }
      });

      setIncidentes(incidents.filter(incident => incident.id !== id));
    } catch (error) {
      alert('Erro ao deletar caso, tente novamente!');
    }
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>
          Bem vinda, <strong>{ongName}</strong>
        </span>

        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button type="button">
          <FiPower size={18} color="#e02041"></FiPower>
        </button>
      </header>

      <h1>Casos Cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(incident.value)}
            </p>

            <button
              type="button"
              onClick={() => handleDeleteIncident(incident.id)}
            >
              <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
