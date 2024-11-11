import React, { useState, useEffect } from 'react';
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

const formStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '15px',
  width: '300px',
};

const labelStyle = {
  textAlign: 'left' as const,
  fontSize: '16px',
};

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const dropdownStyle = {
  padding: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
};

const saveButtonStyle = {
  backgroundColor: '#0055cc',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default function EditarUsuario() {
  const router = useRouter();
  const { id } = router.query;

  const apiUrl = 'http://127.0.0.1:8000/users';
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState({
    nome: '',
    username: '',
    descricao: '',
    cargo: 'Administrador',
  });

  const cargos = ['Administrador', 'Bibliotecário', 'Leitor'];

  useEffect(() => {
    const obterToken = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/auth/login', {
          username: 'admin',
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

  useEffect(() => {
    if (id && token) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${apiUrl}/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            const { display_name, username, description, role } = response.data;
            setUserData({
              nome: display_name,
              username,
              descricao: description,
              cargo: role.name,
            });
          }
        } catch (error) {
          console.error('Erro ao carregar dados do usuário:', error);
          alert('Erro ao carregar dados do usuário.');
        }
      };

      fetchUserData();
    }
  }, [id, token]);

  const handleSave = async () => {
    try {
      await axios.put(`${apiUrl}/${id}`, {
        display_name: userData.nome,
        username: userData.username,
        description: userData.descricao,
        role: { name: userData.cargo },
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Redireciona para a página de visualização passando o `user_id`
      router.push({
        pathname: '/visualizarusuario',
        query: {
          user_id: id,  // Corrigido para user_id para manter a consistência com a página de visualização
        },
      });
    } catch (error) {
      console.error('Erro ao salvar dados do usuário:', error);
      alert('Erro ao salvar dados do usuário.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div style={containerStyle}>
      <Head>
        <title>Editar Usuário</title>
      </Head>

      <main style={mainContentStyle}>
        <h1 style={titleStyle}>Editar Informações do Usuário</h1>

        <div style={userInfoStyle}>
          <div style={avatarStyle}></div>
          <div style={formStyle}>
            <label style={labelStyle}><strong>Nome:</strong></label>
            <input
              type="text"
              name="nome"
              value={userData.nome}
              placeholder="Nome"
              onChange={handleChange}
              style={{ ...inputStyle, color: '#000' }}
            />

            <label style={labelStyle}><strong>Username:</strong></label>
            <input
              type="text"
              name="username"
              value={userData.username}
              placeholder="Username"
              onChange={handleChange}
              style={{ ...inputStyle, color: '#000' }}
            />

            <label style={labelStyle}><strong>Descrição:</strong></label>
            <input
              type="text"
              name="descricao"
              value={userData.descricao}
              placeholder="Descrição"
              onChange={handleChange}
              style={{ ...inputStyle, color: '#000' }}
            />

            <label style={labelStyle}><strong>Cargo:</strong></label>
            <select
              name="cargo"
              value={userData.cargo}
              onChange={handleChange}
              style={{ ...dropdownStyle, color: '#000' }}
            >
              {cargos.map((cargo) => (
                <option key={cargo} value={cargo}>
                  {cargo}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={buttonContainerStyle}>
          <button onClick={handleSave} style={saveButtonStyle}>Salvar</button>
        </div>
      </main>
    </div>
  );
}
