import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const mainContentStyle = {
  padding: '120px 40px',
  width: '100%',
  textAlign: 'center',
};

const titleStyle = {
  fontSize: '28px',
  fontWeight: 'bold',
  marginBottom: '20px',
  color: '#FFFFFF', 
};

const userInfoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  marginBottom: '30px',
};

const avatarStyle = {
  width: '80px',
  height: '80px',
  backgroundColor: '#ccc',
  borderRadius: '50%',
};

const infoTextStyle = {
  fontSize: '18px',
  color: '#FFFFFF', 
};

const buttonContainerStyle = {
  display: 'flex',
  gap: '20px',
  marginTop: '20px',
};

const editButtonStyle = {
  backgroundColor: '#0055cc',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default function VisualizarUsuario() {
  const router = useRouter();
  const { user_id } = router.query; // Recebe apenas o user_id via query

  const apiUrl = 'http://127.0.0.1:8000/users';
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({
    nome: '',
    username: '',
    descricao: '',
    cargo: '',
  });

  // Função para obter o token de autenticação
  useEffect(() => {
    const obterToken = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/auth/login', {
          username: 'admin', // Substitua com suas credenciais reais
          password: 'abc123',
        });

        if (response.status === 200 && response.data.token) {
          setToken(response.data.token);
        } else {
          alert('Falha ao obter o token.');
        }
      } catch (error) {
        console.error('Erro ao obter o token:', error);
        alert('Erro ao obter o token. Verifique as credenciais.');
      }
    };

    obterToken();
  }, []);

  // Função para buscar dados do usuário apenas se `user_id` e `token` estiverem disponíveis
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/${user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.status === 200) {
          const { display_name, username, description, role } = response.data;
          setUserData({
            nome: display_name,
            username: username,
            descricao: description,
            cargo: role ? role.name : '',
          });
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        alert('Erro ao carregar dados do usuário.');
      }
    };

    if (user_id && token) {
      fetchUserData();
    }
  }, [user_id, token]);

  return (
    <div style={containerStyle}>
      <Head>
        <title>Visualizar Usuário</title>
      </Head>

      <main style={mainContentStyle}>
        <h1 style={titleStyle}>Informações do Usuário</h1>

        <div style={userInfoStyle}>
          <div style={avatarStyle}></div>
          <div>
            <p style={infoTextStyle}><strong>Nome:</strong> {userData.nome || 'Nome não disponível'}</p>
            <p style={infoTextStyle}><strong>Username:</strong> {userData.username || 'Username não disponível'}</p>
            <p style={infoTextStyle}><strong>Descrição:</strong> {userData.descricao || 'Descrição não disponível'}</p>
            <p style={infoTextStyle}><strong>Cargo:</strong> {userData.cargo || 'Cargo não disponível'}</p>
          </div>
        </div>

        <div style={buttonContainerStyle}>
          <button
            onClick={() => router.push(`/editarusuario?user_id=${user_id}`)}
            style={editButtonStyle}
          >
            Editar
          </button>
        </div>
      </main>
    </div>
  );
}
